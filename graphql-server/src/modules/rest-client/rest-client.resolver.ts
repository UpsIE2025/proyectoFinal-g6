import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StudentModel } from './models/student.model';
import { StudentInput } from './dto/student.input';
import { RestClientService } from 'src/modules/rest-client/rest-client.service';

@Resolver(() => StudentModel)
export class RestClientResolver {
  constructor(private readonly restClientService: RestClientService) {}

  @Mutation(() => StudentModel)
  async sendStudentData(@Args('student') student: StudentInput): Promise<StudentModel> {
    return this.restClientService.sendStudentData(student);
  }
}
