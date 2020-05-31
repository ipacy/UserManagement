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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;
        }

        // GET: List
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserItem>>> GetUserItems()
        {
            return await _context.UserItems.ToListAsync();
        }

        // GET: api/user/5
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

        // POST: api/user
        [HttpPost]
        public async Task<ActionResult<UserItem>> PostUserItem(UserItem item)
        {
            _context.UserItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserItem), new { id = item.Id }, item);
        }

        // PUT: api/user/5
        [Authorize(Policy = "AdminRole")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserItem(long id, UserItemDTO item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            ///_context.Entry(item).State = EntityState.Modified;

            var userItem = await _context.UserItems.FindAsync(id);
            if (userItem == null)
            {
                return NotFound();
            }

            userItem.Name = item.Name;
            userItem.IsActive = item.IsActive;
            userItem.IsAdmin = item.IsAdmin;
            userItem.Email = item.Email;
            userItem.Role = item.Role;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/user/5
        [Authorize(Policy = "AdminRole")]
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
