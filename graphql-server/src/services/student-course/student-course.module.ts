import { Module } from '@nestjs/common';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { StudentCourseService } from './student-course.service';

@Module({
  imports: [GrpcClientModule],
  providers: [StudentCourseService],
  exports: [StudentCourseService],
})
export class StudentCourseModule {}
