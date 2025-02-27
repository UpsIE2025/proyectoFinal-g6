import { Module } from '@nestjs/common';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { CourseService } from './course.service';
import { CourseResolver } from 'src/graphql/resolvers/course/course.resolver';

@Module({
  imports: [GrpcClientModule],
  providers: [CourseService, CourseResolver],
  exports: [CourseService],
})
export class CourseModule {}
