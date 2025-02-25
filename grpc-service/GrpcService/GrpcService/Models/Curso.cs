using System;
using System.Collections.Generic;

namespace GrpcService.Models;

public partial class Curso
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public bool Estado { get; set; }

    public virtual ICollection<EstudianteCurso> EstudianteCursos { get; set; } = new List<EstudianteCurso>();
}
