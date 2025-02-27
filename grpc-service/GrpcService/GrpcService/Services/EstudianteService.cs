using Grpc.Core;
using GrpcService.Models;
using GrpcService.Repositories;
using Microsoft.EntityFrameworkCore;

namespace GrpcService.Services
{
    public class EstudianteService(IEstudianteRepository estudianteRepository) : StudentService.StudentServiceBase
    {
        private readonly IEstudianteRepository _estudianteRepository = estudianteRepository;

        public override async Task<GetStudentsResponse> GetStudents(EmptyStudentRequest request, ServerCallContext context)
        {
            var estudiantes = await _estudianteRepository.GetEstudiantes();

            var response = new GetStudentsResponse();
            response.Students.AddRange(estudiantes.Select(e => new Student
            {
                Id = e.Id,
                Nombre = e.Nombre,
                Apellido = e.Apellido,
                Direccion = e.Direccion ?? "",
                Estado = e.Estado
            }));

            return response;
        }

        public override async Task<Student> GetStudent(GetStudentRequest request, ServerCallContext context)
        {
            var estudiante = await _estudianteRepository.GetEstudiante(request.Id);

            return new Student
            {
                Id = estudiante.Id,
                Nombre = estudiante.Nombre,
                Apellido = estudiante.Apellido,
                Direccion = estudiante.Direccion ?? "",
                Estado = estudiante.Estado
            };
        }

        public override async Task<Student> CreateStudent(CreateStudentRequest request, ServerCallContext context)
        {
            var estudiante = await _estudianteRepository.CreateEstudiante(request.Nombre, request.Apellido, request.Direccion);

            return new Student
            {
                Id = estudiante.Id,
                Nombre = estudiante.Nombre,
                Apellido = estudiante.Apellido,
                Direccion = estudiante.Direccion,
                Estado = estudiante.Estado
            };
        }

        public override async Task<Student> UpdateStudent(UpdateStudentRequest request, ServerCallContext context)
        {
            var estudiante = await _estudianteRepository.UpdateEstudiante(request.Id,request.Nombre, request.Apellido, request.Direccion, request.Estado);

            return new Student
            {
                Id = estudiante.Id,
                Nombre = estudiante.Nombre,
                Apellido = estudiante.Apellido,
                Direccion = estudiante.Direccion,
                Estado = estudiante.Estado
            };
        }

        public override async Task<Student> DeleteStudent(DeleteStudentRequest request, ServerCallContext context)
        {
            var estudiante = await _estudianteRepository.DeleteEstudiante(request.Id);

            return new Student
            {
                Id = estudiante.Id,
                Nombre = estudiante.Nombre,
                Apellido = estudiante.Apellido,
                Direccion = estudiante.Direccion,
                Estado = estudiante.Estado
            };
        }
    }
}
