using System;
using System.Collections.Generic;

namespace GrpcService.Models;

public partial class Estudiante
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string? Direccion { get; set; }

    public bool Estado { get; set; }

    public virtual ICollection<EstudianteCurso> EstudianteCursos { get; set; } = new List<EstudianteCurso>();
}
