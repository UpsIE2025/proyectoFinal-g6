import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COURSE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_COURSE_URL || 'localhost:50051',
          package: 'courseGrpc',
          protoPath: join(__dirname, 'curso.proto'),
        },
      },
      {
        name: 'STUDENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_STUDENT_URL || 'localhost:50051',
          package: 'studentGrpc',
          protoPath: join(__dirname, 'estudiante.proto'),
        },
      },
      {
        name: 'STUDENT_COURSE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_STUDENT_COURSE_URL || 'localhost:50051',
          package: 'cursoEstudianteGrpc',
          protoPath: join(__dirname, 'estudianteCurso.proto'),
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GrpcClientModule {}
