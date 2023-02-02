using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MODELS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DB
{
    public class ApplicationContext: DbContext
    {
        private readonly string _connectionString;
        public ApplicationContext()
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json");
            var configuration = builder.Build();
            _connectionString = configuration.GetConnectionString("DB");
        }

        public ApplicationContext(DbContextOptions<DbContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }
        }
        public DbSet<Asignaciones> Asignaciones { get; set; }
        public DbSet<Edificios> Edificios { get; set; }
        public DbSet<Trabajadores> Trabajadores { get; set; }
    }
}
