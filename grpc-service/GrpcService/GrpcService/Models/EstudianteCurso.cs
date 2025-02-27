using System.ComponentModel.DataAnnotations.Schema;

namespace GrpcService.Models;

public partial class EstudianteCurso
{
    public int Id { get; set; }

    public int EstudianteId { get; set; }

    public int CursoId { get; set; }

    public bool Estado { get; set; }

    [NotMapped]
    public virtual string? EstudianteNombre { get; set; }

    [NotMapped]
    public virtual string? CursoNombre { get; set; }

    public virtual Curso Curso { get; set; } = null!;

    public virtual Estudiante Estudiante { get; set; } = null!;
}
