using GrpcService.Models;

namespace GrpcService.Repositories
{
    public interface IEstudianteCursoRepository
    {
        Task<EstudianteCurso> CreateStudentCourse(int estudianteId, int cursoId);
        Task<EstudianteCurso> DeleteStudentCourse(int id);
        Task<EstudianteCurso> GetStudentCourse(int id);
        Task<IEnumerable<EstudianteCurso>> GetStudentCourses();
        Task<EstudianteCurso> UpdateStudentCourse(EstudianteCurso estudianteCurso);
    }
}