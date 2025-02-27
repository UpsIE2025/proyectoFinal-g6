import { Module } from '@nestjs/common';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { CourseService } from './course.service';

@Module({
  imports: [GrpcClientModule],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
