import { Args, Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { StudentCourse } from 'src/graphql/models/studentCourse.model';
import { StudentCourseService } from 'src/services/student-course/student-course.service';

@Resolver(() => StudentCourse)
export class StudentCourseResolver {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Query(() => [StudentCourse])
  async getStudentCourses(): Promise<StudentCourse[]> {
    const response = await lastValueFrom(this.studentCourseService.getStudentCourses());
    return response.studentCourses;
  }

  @Query(() => StudentCourse, { nullable: true })
  async getStudentCourse(@Args('id') id: number): Promise<StudentCourse | null> {
    try {
      return await lastValueFrom(this.studentCourseService.getStudentCourse(id));
    } catch (error) {
      console.error('Error fetching student course relation:', error);
      return null;
    }
  }
}
