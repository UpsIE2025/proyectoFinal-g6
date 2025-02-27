import { Args, Query, Resolver } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { Course } from 'src/graphql/models/course.model';
import { CourseService } from 'src/services/course/course.service';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Query(() => [Course])
  async getCourses(): Promise<Course[]> {
    const response = await lastValueFrom(this.courseService.getCourses());
    return response.courses;
  }

  @Query(() => Course, { nullable: true })
  async getCourse(@Args('id') id: number): Promise<Course | null> {
    try {
      return await lastValueFrom(this.courseService.getCourse(id));
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }
}
