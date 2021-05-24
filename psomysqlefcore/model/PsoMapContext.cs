using Microsoft.EntityFrameworkCore;
using psomysqlefcore.model.Entities;

namespace psomysqlefcore
{
    public class PsoMapContext : DbContext
    {
        public DbSet<FeatureType> FeatureType { get; set; }
        public DbSet<MapFeature> MapFeature { get; set; }
        public DbSet<Users> Users { get; set; }

        private const string connectionString = "server=localhost;database=library;user=user;password=password";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
