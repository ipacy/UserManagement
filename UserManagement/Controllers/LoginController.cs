using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Models;
using System.Security.Claims;


namespace UserManagement.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly UserContext _context;

        public LoginController(UserContext context)
        {
            _context = context;

            if (_context.UserItems.Count() == 0)
            {
                _context.UserItems.Add(new UserItem { Name = "user1", IsAdmin = true, Email = "user1@email.com", Role = "Admin" });
                _context.UserItems.Add(new UserItem { Name = "user2", IsAdmin = false, Email = "user2@email.com", Role = "User" });
                _context.UserItems.Add(new UserItem { Name = "user3", IsAdmin = false, Email = "user3@email.com", Role = "User" });
                _context.UserItems.Add(new UserItem { Name = "user4", IsAdmin = true, Email = "user4@email.com", Role = "Admin" });
                _context.SaveChanges();
            }
        }

        // POST: api/User
        [HttpPost]
        public UserItem CheckUser(UserItem objUser)
        {
            if (ModelState.IsValid)
            {

                var obj = _context.UserItems.Where(a => a.Name.Equals(objUser.Name)).FirstOrDefault();
                if (obj != null)
                {

                    var claims = new List<Claim>()
                         {
                             new Claim(ClaimTypes.Name, obj.Name),
                             new Claim(ClaimTypes.Email, obj.Email),
                             new Claim(ClaimTypes.NameIdentifier, obj.Id.ToString()),
                             new Claim(ClaimTypes.Role, obj.Role)
                         };

                    var identity = new ClaimsIdentity(claims, "General Identity");
                    var principal = new ClaimsPrincipal(identity);


                    HttpContext.SignInAsync(principal);
                    obj.IsActive = true;
                    return obj;
                }
            }
            objUser.IsActive = false;
            return objUser;
        }


        [HttpPut("{id}")]
        public bool Logout(long id)
        {
            if (id == 0)
            {
                Response.Cookies.Delete("MyAuthCookie");
            }

            return true;
        }

        [HttpGet]
        public UserItemDTO GetUser()
        {
            UserItemDTO newObj = new UserItemDTO();
            if (HttpContext.User.Claims.ToList().Count > 0)
            {
                newObj.Name = HttpContext.User.Claims.ToList()[0].Value;
                newObj.Email = HttpContext.User.Claims.ToList()[1].Value;
                newObj.Id = Convert.ToInt64(HttpContext.User.Claims.ToList()[2].Value);
                newObj.Role = HttpContext.User.Claims.ToList()[3].Value;
            }

            return newObj;
        }
    }
}
