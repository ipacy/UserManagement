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
    public class UserController : Controller
    {
        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;

            if (_context.UserItems.Count() == 0)
            {
                _context.UserItems.Add(new UserItem { Name = "User1" });
                _context.SaveChanges();
            }
        }

        [Authorize(Policy = "AdminRole")]
        public IActionResult Index()
        {
            ViewData["UserClaims"] = HttpContext.User.Claims.ToList();

            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult AccessDenied()
        {
            return View();
        }

        public IActionResult Auth()
        {
            //Authenticate the user nad generate the cookie based on uer details...

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "Aidin Mashinchi"),
                new Claim(ClaimTypes.Email, "aidin.mashinchi@gmail.com"),
                new Claim(ClaimTypes.NameIdentifier, "1234"),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var identity = new ClaimsIdentity(claims, "General Identity");
            var principal = new ClaimsPrincipal(identity);

            HttpContext.SignInAsync(principal);

            return RedirectToAction("Index");
        }
 

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserItem>>> GetUserItems()
        {
            return await _context.UserItems.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserItem>> GetUserItem(long id)
        {
            var UserItem = await _context.UserItems.FindAsync(id);

            if (UserItem == null)
            {
                return NotFound();
            }

            return UserItem;
        }


        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<UserItem>> PostUserItem(UserItem item)
        {
            _context.UserItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserItem), new { id = item.Id }, item);
        }


        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserItem(long id, UserItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserItem(long id)
        {
            var UserItem = await _context.UserItems.FindAsync(id);

            if (UserItem == null)
            {
                return NotFound();
            }

            _context.UserItems.Remove(UserItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
