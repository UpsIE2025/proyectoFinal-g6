import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseService } from './services/course/course.service';
import { StudentService } from './services/student/student.service';
import { StudentCourseService } from './services/student-course/student-course.service';
import { CourseModule } from './services/course/course.module';
import { StudentModule } from './services/student/student.module';
import { StudentCourseModule } from './services/student-course/student-course.module';

@Module({
  imports: [CourseModule, StudentModule, StudentCourseModule],
  controllers: [AppController],
  providers: [AppService, CourseService, StudentService, StudentCourseService],
})
export class AppModule {}
