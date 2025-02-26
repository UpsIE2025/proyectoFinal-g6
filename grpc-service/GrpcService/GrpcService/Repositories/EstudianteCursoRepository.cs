﻿using Grpc.Core;
using GrpcService.Contexts;
using GrpcService.Models;
using Microsoft.EntityFrameworkCore;

namespace GrpcService.Repositories
{
    public class EstudianteCursoRepository : IEstudianteCursoRepository
    {
        private readonly ApplicationDbContext _context;

        public EstudianteCursoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EstudianteCurso>> GetStudentCourses()
        {
            List<EstudianteCurso> estudiantesCursos = await _context.EstudianteCursos
                .Include(sc => sc.Estudiante)
                .Include(sc => sc.Curso)
                .Where(ec => ec.Estado)
                .ToListAsync();

            return estudiantesCursos;
        }

        public async Task<EstudianteCurso> GetStudentCourse(int id)
        {
            var studentCourse = await _context.EstudianteCursos
                .Include(sc => sc.Estudiante)
                .Include(sc => sc.Curso)
                .FirstOrDefaultAsync(sc => sc.Id == id);

            if (studentCourse == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "StudentCourse not found"));
            }

            return studentCourse;
        }


        public async Task<EstudianteCurso> CreateStudentCourse(int estudianteId, int cursoId)
        {
            // Check if the student and course exist
            var estudiante = await _context.EstudianteCursos.FindAsync(estudianteId);

            if (estudiante == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Student not found"));
            }

            var curso = await _context.Cursos.FindAsync(cursoId);

            if (curso == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Course not found"));
            }

            var studentCourse = new EstudianteCurso
            {
                EstudianteId = estudianteId,
                CursoId = cursoId,
                Estado = true
            };

            _context.EstudianteCursos.Add(studentCourse);
            await _context.SaveChangesAsync();

            return studentCourse;
        }

        public async Task<EstudianteCurso> UpdateStudentCourse(EstudianteCurso estudianteCurso)
        {
            var cursoEliminar = await _context.EstudianteCursos.FindAsync(estudianteCurso.EstudianteId);
            if (cursoEliminar != null)
            {
                cursoEliminar.Estado = false;
                _context.EstudianteCursos.Update(cursoEliminar);
                await _context.SaveChangesAsync();
            }


            var course = await _context.Cursos.FindAsync(estudianteCurso.CursoId);
            if (course == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Course not found"));
            }

            return await CreateStudentCourse(estudianteCurso.EstudianteId, estudianteCurso.CursoId);

        }

        public async Task<EstudianteCurso> DeleteStudentCourse(int id)
        {
            var estudianteCurso = await _context.EstudianteCursos.FindAsync(id);
            if (estudianteCurso == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "StudentCourse not found"));
            }

            estudianteCurso.Estado = false;
            _context.Entry(estudianteCurso).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return estudianteCurso;
        }
    }
}