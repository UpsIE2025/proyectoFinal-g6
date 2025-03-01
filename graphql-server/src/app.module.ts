import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GrpcClientModule } from './grpc/grpc-client.module';
import { CourseModule } from './services/course/course.module';
import { StudentModule } from './services/student/student.module';
import { StudentCourseModule } from './services/student-course/student-course.module';
import { ConfigModule } from '@nestjs/config';
import { RestClientModule } from './modules/rest-client/rest-client.module';
import { RestClientResolver } from './modules/rest-client/rest-client.resolver';
@Module({
  imports: [
    // Cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }), // Permitir autenticación con Auth0
    }),

    // Módulo que contiene los clientes gRPC
    GrpcClientModule,

    // Módulos de funcionalidad
    CourseModule,
    StudentModule,
    StudentCourseModule,
    RestClientModule,
  ],
  providers: [RestClientResolver],
})
export class AppModule {}
