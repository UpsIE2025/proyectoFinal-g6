using GrpcService.Models;

namespace GrpcService.Repositories
{
    public interface ICursoRepository
    {
        Task<Curso> CreateCurso(string nombre);
        Task<Curso> DeleteCurso(int id);
        Task<Curso> GetCurso(int id);
        Task<List<Curso>> GetCursos();
        Task<Curso> UpdateCurso(int id, string nombre, bool estado);
    }
}