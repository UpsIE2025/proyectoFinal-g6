import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: number;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  direccion: string;

  @Field()
  estado: boolean;
}
