using Grpc.Core;
using GrpcService.Repositories;

namespace GrpcService.Services
{
    public class CursoService(ICursoRepository cursoRepository) : CourseService.CourseServiceBase
    {
        private readonly ICursoRepository _cursoRepository = cursoRepository;

        public override async Task<GetCoursesResponse> GetCourses(Empty request, ServerCallContext context)
        {
            var cursos = await _cursoRepository.GetCursos();

            var response = new GetCoursesResponse();
            response.Courses.AddRange(cursos.Select(c => new Course
            {
                Id = c.Id,
                Nombre = c.Nombre,
                Estado = c.Estado
            }));

            return response;
        }

        public override async Task<Course> GetCourse(GetCourseRequest request, ServerCallContext context)
        {
            var curso = await _cursoRepository.GetCurso(request.Id);

            return new Course
            {
                Id = curso.Id,
                Nombre = curso.Nombre,
                Estado = curso.Estado
            };
        }

        public override async Task<Course> CreateCourse(CreateCourseRequest request, ServerCallContext context)
        {
            var curso = await _cursoRepository.CreateCurso(request.Nombre);

            return new Course
            {
                Id = curso.Id,
                Nombre = curso.Nombre,
                Estado = curso.Estado
            };
        }

        public override async Task<Course> UpdateCourse(UpdateCourseRequest request, ServerCallContext context)
        {
            var curso = await _cursoRepository.UpdateCurso(request.Nombre, request.Estado);

            return new Course
            {
                Id = curso.Id,
                Nombre = curso.Nombre,
                Estado = curso.Estado
            };
        }

        public override async Task<Course> DeleteCourse(DeleteCourseRequest request, ServerCallContext context)
        {
            var curso = await _cursoRepository.DeleteCurso(request.Id);

            return new Course
            {
                Id = curso.Id,
                Nombre = curso.Nombre,
                Estado = curso.Estado
            };
        }
    }
}
