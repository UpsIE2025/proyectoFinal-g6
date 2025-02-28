import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface Course {
  id: number;
  nombre: string;
  estado: boolean;
}

@Injectable()
export class CourseService {
  private courseClient: any;

  constructor(@Inject('COURSE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.courseClient = this.client.getService('CourseService');
  }

  getCourses(): Observable<{ courses: Course[] }> {
    return this.courseClient.GetCourses({});
  }

  getCourse(id: number): Observable<Course> {
    return this.courseClient.GetCourse({ id });
  }
}
