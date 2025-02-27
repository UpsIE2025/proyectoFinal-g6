import { Module } from '@nestjs/common';
import { GrpcClientModule } from 'src/grpc/grpc-client.module';
import { StudentService } from './student.service';

@Module({
  imports: [GrpcClientModule],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
