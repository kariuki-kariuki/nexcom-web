import { Test, TestingModule } from '@nestjs/testing';
import { FaqsService } from './faqs.service';

describe('FaqsService', () => {
  let service: FaqsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaqsService],
    }).compile();

    service = module.get<FaqsService>(FaqsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
