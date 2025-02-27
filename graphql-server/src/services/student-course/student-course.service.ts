import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface StudentCourse {
  id: number;
  estudianteId: number;
  cursoId: number;
  fechaInscripcion: string;
}

@Injectable()
export class StudentCourseService {
  private studentCourseClient: any;

  constructor(@Inject('STUDENT_COURSE_PACKAGE') private client: ClientGrpc) {} // 👈 Debe coincidir con grpc-client.module.ts

  onModuleInit() {
    this.studentCourseClient = this.client.getService('StudentCourseService'); // 👈 Nombre del servicio en el .proto
  }

  getStudentCourses(): Observable<{ studentCourses: StudentCourse[] }> {
    return this.studentCourseClient.GetStudentCourses({});
  }

  getStudentCourse(id: number): Observable<StudentCourse> {
    return this.studentCourseClient.GetStudentCourse({ id });
  }
}
