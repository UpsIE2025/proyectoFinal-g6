import { Test, TestingModule } from '@nestjs/testing';
import { StudentCourseResolver } from './student-course.resolver';

describe('StudentCourseResolver', () => {
  let resolver: StudentCourseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentCourseResolver],
    }).compile();

    resolver = module.get<StudentCourseResolver>(StudentCourseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
