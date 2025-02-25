using GrpcService.Models;
using Microsoft.EntityFrameworkCore;

namespace GrpcService.Contexts;

public partial class MydatabaseContext : DbContext
{
    public MydatabaseContext()
    {
    }

    public MydatabaseContext(DbContextOptions<MydatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Curso> Cursos { get; set; }

    public virtual DbSet<Estudiante> Estudiantes { get; set; }

    public virtual DbSet<EstudianteCurso> EstudianteCursos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Curso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("curso_pkey");

            entity.ToTable("curso");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("estudiante_pkey");

            entity.ToTable("estudiante");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellido)
                .HasColumnName("apellido");
            entity.Property(e => e.Direccion)
                .HasColumnName("direccion");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<EstudianteCurso>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("estudiante_curso_pkey");

            entity.ToTable("estudiante_curso");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CursoId).HasColumnName("cursoId");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.EstudianteId).HasColumnName("estudianteId");

            entity.HasOne(d => d.Curso).WithMany(p => p.EstudianteCursos)
                .HasForeignKey(d => d.CursoId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Estudiante).WithMany(p => p.EstudianteCursos)
                .HasForeignKey(d => d.EstudianteId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
