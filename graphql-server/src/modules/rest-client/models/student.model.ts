import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StudentModel {
  @Field()
  codigo: string;

  @Field()
  estado: string;

  @Field()
  nombres: string;

  @Field()
  apellidos: string;

  @Field()
  direccion: string;
}
