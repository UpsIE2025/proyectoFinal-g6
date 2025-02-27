import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: number;

  @Field()
  nombre: string;

  @Field()
  estado: boolean;
}
