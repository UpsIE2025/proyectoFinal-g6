import { Module } from '@nestjs/common';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { StudentService } from './student.service';
import { StudentResolver } from 'src/graphql/resolvers/student/student.resolver';

@Module({
  imports: [GrpcClientModule],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
