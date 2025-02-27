import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface Student {
  id: number;
  nombre: string;
  edad: number;
  estado: boolean;
}

@Injectable()
export class StudentService {
  private studentClient: any;

  constructor(@Inject('STUDENT_PACKAGE') private client: ClientGrpc) {} // 👈 Debe coincidir con grpc-client.module.ts

  onModuleInit() {
    this.studentClient = this.client.getService('StudentService'); // 👈 Nombre del servicio en el .proto
  }

  getStudents(): Observable<{ students: Student[] }> {
    return this.studentClient.GetStudents({});
  }

  getStudent(id: number): Observable<Student> {
    return this.studentClient.GetStudent({ id });
  }
}
