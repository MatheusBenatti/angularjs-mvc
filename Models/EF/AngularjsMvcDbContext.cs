using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace AngularjsMvc.Models.EF
{
    public class AngularjsMvcDbContext : DbContext
    {
        public AngularjsMvcDbContext(): base("name = AngularjsMvcDbContext")
        {
            
        }
        // settings EF convention
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {   
            // singular table name
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
    }
}