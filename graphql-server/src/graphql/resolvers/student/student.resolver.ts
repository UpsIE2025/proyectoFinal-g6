import { Args, Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { Student } from 'src/graphql/models/student.model';
import { StudentService } from 'src/services/student/student.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  async getStudents(): Promise<Student[]> {
    const response = await lastValueFrom(this.studentService.getStudents());
    return response.students;
  }

  @Query(() => Student, { nullable: true })
  async getStudent(@Args('id') id: number): Promise<Student | null> {
    try {
      return await lastValueFrom(this.studentService.getStudent(id));
    } catch (error) {
      console.error('Error fetching student:', error);
      return null;
    }
  }
}
