using Microsoft.EntityFrameworkCore;

namespace UserManagement.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        public DbSet<UserItem> UserItems { get; set; }
    }
}