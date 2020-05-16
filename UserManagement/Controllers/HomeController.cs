using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace UserManagement.Controllers
{
    public class HomeController : Controller
    {
        [Authorize(Policy ="AdminRole")]
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
    }
}