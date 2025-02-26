using Grpc.Core;
using GrpcService.Contexts;
using GrpcService.Models;
using Microsoft.EntityFrameworkCore;

namespace GrpcService.Repositories
{
    public class EstudianteRepository(ApplicationDbContext context) : IEstudianteRepository
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<List<Estudiante>> GetEstudiantes()
        {
            return await _context.Estudiantes.ToListAsync();
        }

        public async Task<Estudiante> GetEstudiante(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);

            if (estudiante == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Estudiante not found"));
            }

            return estudiante;
        }

        public async Task<Estudiante> CreateEstudiante(string nombre, string apellido, string direccion)
        {
            var estudiante = new Estudiante
            {
                Nombre = nombre,
                Apellido = apellido,
                Direccion = direccion,
                Estado = true
            };

            _context.Estudiantes.Add(estudiante);
            await _context.SaveChangesAsync();

            return estudiante;
        }

        public async Task<Estudiante> UpdateEstudiante(int id, string nombre, string apellido, string direccion, bool estado)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Estudiante not found"));
            }

            estudiante.Nombre = nombre;
            estudiante.Apellido = apellido;
            estudiante.Direccion = direccion;
            estudiante.Estado = estado;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw new RpcException(new Status(StatusCode.Aborted, "Concurrency error"));
            }

            return estudiante;
        }

        public async Task<Estudiante> DeleteEstudiante(int id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Estudiante not found"));
            }

            estudiante.Estado = false;
            _context.Entry(estudiante).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return estudiante;
        }
    }
}
