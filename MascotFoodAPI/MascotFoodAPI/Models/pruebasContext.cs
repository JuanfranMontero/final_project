using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MascotFoodAPI.Models
{
    public partial class pruebasContext : DbContext
    {
        public pruebasContext()
        {
        }

        public pruebasContext(DbContextOptions<pruebasContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Alimento> Alimentos { get; set; } = null!;
        public virtual DbSet<Caracteristica> Caracteristicas { get; set; } = null!;
        public virtual DbSet<DescripcionNutricional> DescripcionNutricionals { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Alimento>(entity =>
            {
                entity.HasKey(e => e.IdAlimento)
                    .HasName("PK_alimentos_id_alimento");

                entity.ToTable("alimentos", "proyecto_final");

                entity.Property(e => e.IdAlimento).HasColumnName("id_alimento");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(80)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Enlace)
                    .HasMaxLength(50)
                    .HasColumnName("enlace");

                entity.Property(e => e.EnlaceImagen)
                    .HasMaxLength(50)
                    .HasColumnName("enlace_imagen");
            });

            modelBuilder.Entity<Caracteristica>(entity =>
            {
                entity.HasKey(e => e.IdCaracteristica)
                    .HasName("PK_caracteristicas_id_caracteristica");

                entity.ToTable("caracteristicas", "proyecto_final");

                entity.Property(e => e.IdCaracteristica).HasColumnName("id_caracteristica");

                entity.Property(e => e.CodigoEan)
                    .HasMaxLength(250)
                    .HasColumnName("codigo_EAN");

                entity.Property(e => e.Edad)
                    .HasMaxLength(10)
                    .HasColumnName("edad");

                entity.Property(e => e.IngredientePrincipal)
                    .HasMaxLength(25)
                    .HasColumnName("ingrediente_principal");

                entity.Property(e => e.Observaciones)
                    .HasMaxLength(80)
                    .HasColumnName("observaciones");

                entity.Property(e => e.Raza)
                    .HasMaxLength(100)
                    .HasColumnName("raza");

                entity.Property(e => e.Tipo)
                    .HasMaxLength(10)
                    .HasColumnName("tipo");
            });

            modelBuilder.Entity<DescripcionNutricional>(entity =>
            {
                entity.HasKey(e => e.IdDescripcion)
                    .HasName("PK_descripcion_nutricional_id_descripcion");

                entity.ToTable("descripcion_nutricional", "proyecto_final");

                entity.Property(e => e.IdDescripcion).HasColumnName("id_descripcion");

                entity.Property(e => e.Ingredientes)
                    .HasMaxLength(2500)
                    .HasColumnName("ingredientes");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
