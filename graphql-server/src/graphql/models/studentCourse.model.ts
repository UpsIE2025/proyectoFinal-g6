import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentCourse {
  @Field(() => ID)
  id: number;

  @Field()
  estudiante_id: number;

  @Field()
  estudiante_nombre: string;

  @Field()
  curso_id: number;

  @Field()
  curso_nombre: string;

  @Field()
  estado: boolean;
}
