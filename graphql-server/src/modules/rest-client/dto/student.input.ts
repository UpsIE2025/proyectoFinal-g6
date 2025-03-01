import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class StudentInput {
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
