using Grpc.Core;
using GrpcService.Contexts;
using GrpcService.Models;
using Microsoft.EntityFrameworkCore;

namespace GrpcService.Repositories
{
    public class CursoRepository(ApplicationDbContext context) : ICursoRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<List<Curso>> GetCursos()
        {
            return await _context.Cursos.ToListAsync();
        }

        public async Task<Curso> GetCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);

            if (curso == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Curso not found"));
            }

            return curso;
        }

        public async Task<Curso> CreateCurso(string nombre)
        {
            Curso curso = new()
            {
                Estado = true,
                Nombre = nombre
            };

            _context.Cursos.Add(curso);
            await _context.SaveChangesAsync();

            return curso;
        }

        public async Task<Curso> UpdateCurso(int id, string nombre, bool estado)
        {
            var curso = await GetCurso(id);

            curso.Estado = estado;
            curso.Nombre = nombre;
            curso.Estado = estado;

            _context.Update(curso);
            await _context.SaveChangesAsync();

            return curso;
        }

        public async Task<Curso> DeleteCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);
            if (curso == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Curso not found"));
            }

            curso.Estado = false;
            _context.Update(curso);
            await _context.SaveChangesAsync();

            return curso;
        }
    }
}
