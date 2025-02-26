using GrpcService.Models;

namespace GrpcService.Repositories
{
    public interface IEstudianteRepository
    {
        Task<Estudiante> CreateEstudiante(string nombre, string apellido, string direccion);
        Task<Estudiante> DeleteEstudiante(int id);
        Task<Estudiante> GetEstudiante(int id);
        Task<List<Estudiante>> GetEstudiantes();
        Task<Estudiante> UpdateEstudiante(int id, string nombre, string apellido, string direccion, bool estado);
    }
}