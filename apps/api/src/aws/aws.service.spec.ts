import { Test, TestingModule } from '@nestjs/testing';
import { AwsService } from './aws.service';

describe('AwsService', () => {
  let service: AwsService;
  const mockAwsService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AwsService, useValue: mockAwsService }],
    }).compile();

    service = module.get<AwsService>(AwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
