import { Module } from '@nestjs/common';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { StudentCourseService } from './student-course.service';
import { StudentCourseResolver } from 'src/graphql/resolvers/student-course/student-course.resolver';

@Module({
  imports: [GrpcClientModule],
  providers: [StudentCourseService, StudentCourseResolver],
  exports: [StudentCourseService],
})
export class StudentCourseModule {}
