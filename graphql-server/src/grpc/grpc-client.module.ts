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
          url: 'grpc_server:50051',
          package: 'courseGrpc',
          protoPath: join(__dirname, 'curso.proto'),
        },
      },
      {
        name: 'STUDENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'grpc_server:50051',
          package: 'studentGrpc',
          protoPath: join(__dirname, 'estudiante.proto'),
        },
      },
      {
        name: 'STUDENT_COURSE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'grpc_server:50051',
          package: 'cursoEstudianteGrpc',
          protoPath: join(__dirname, 'estudianteCurso.proto'),
        },
      },
    ]),
  ],
  exports: ['COURSE_PACKAGE', 'STUDENT_PACKAGE', 'STUDENT_COURSE_PACKAGE'],
})
export class GrpcClientModule {}
