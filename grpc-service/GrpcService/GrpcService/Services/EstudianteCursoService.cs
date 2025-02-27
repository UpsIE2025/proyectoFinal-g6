using Grpc.Core;
using GrpcService.Repositories;

namespace GrpcService.Services
{
    public class EstudianteCursoService(IEstudianteCursoRepository estudianteCursoRepository) : StudentCourseService.StudentCourseServiceBase
    {
        private readonly IEstudianteCursoRepository _estudianteCursoRepository = estudianteCursoRepository;

        public override async Task<GetStudentCoursesResponse> GetStudentCourses(EmptyStudentCourseRequest request, ServerCallContext context)
        {
            var estudianteCurso = await _estudianteCursoRepository.GetStudentCourses();

            var response = new GetStudentCoursesResponse();

            IEnumerable<GrpcService.StudentCourse> studentCourses = estudianteCurso.Select(sc => new GrpcService.StudentCourse
            {
                Id = sc.Id,
                EstudianteId = sc.EstudianteId,
                EstudianteNombre = $"{sc.Estudiante.Nombre} {sc.Estudiante.Apellido}",
                CursoId = sc.CursoId,
                CursoNombre = sc.Curso.Nombre,
                Estado = sc.Estado
            }).ToList();

            response.StudentCourses.AddRange(studentCourses);

            return response;
        }

        public override async Task<StudentCourse> GetStudentCourse(StudentCourseRequest request, ServerCallContext context)
        {
            var estudianteCurso = await _estudianteCursoRepository.GetStudentCourse(request.Id);

            return new StudentCourse
            {
                Id = estudianteCurso.Id,
                EstudianteId = estudianteCurso.EstudianteId,
                EstudianteNombre = $"{estudianteCurso.Estudiante.Nombre} {estudianteCurso.Estudiante.Apellido}",
                CursoId = estudianteCurso.CursoId,
                CursoNombre = estudianteCurso.Curso.Nombre,
                Estado = estudianteCurso.Estado
            };
        }


        public override async Task<StudentCourse> CreateStudentCourse(CreateStudentCourseRequest request, ServerCallContext context)
        {
            var estudianteCurso = await _estudianteCursoRepository.CreateStudentCourse(request.EstudianteId, request.CursoId);

            return new StudentCourse
            {
                Id = estudianteCurso.Id,
                EstudianteId = estudianteCurso.EstudianteId,
                EstudianteNombre = $"{estudianteCurso.Estudiante.Nombre} {estudianteCurso.Estudiante.Apellido}",
                CursoId = estudianteCurso.CursoId,
                CursoNombre = estudianteCurso.Curso.Nombre,
                Estado = estudianteCurso.Estado
            };
        }

        public override async Task<StudentCourse> UpdateStudentCourse(UpdateStudentCourseRequest request, ServerCallContext context)
        {
            var estudianteCurso = await _estudianteCursoRepository.CreateStudentCourse(request.EstudianteId, request.CursoId);


            return new StudentCourse
            {
                Id = estudianteCurso.Id,
                EstudianteId = estudianteCurso.EstudianteId,
                EstudianteNombre = $"{estudianteCurso.Estudiante.Nombre} {estudianteCurso.Estudiante.Apellido}",
                CursoId = estudianteCurso.CursoId,
                CursoNombre = estudianteCurso.Curso.Nombre,
                Estado = estudianteCurso.Estado
            };
        }

        public override async Task<StudentCourse> DeleteStudentCourse(DeleteStudentCourseRequest request, ServerCallContext context)
        {
            var estudianteCurso = await _estudianteCursoRepository.DeleteStudentCourse(request.Id);

            return new StudentCourse
            {
                Id = estudianteCurso.Id,
                EstudianteId = estudianteCurso.EstudianteId,
                CursoId = estudianteCurso.CursoId,
                Estado = estudianteCurso.Estado
            };
        }
    }
}
