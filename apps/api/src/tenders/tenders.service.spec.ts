import { Test, TestingModule } from '@nestjs/testing';
import { TendersService } from './tenders.service';

describe('TendersService', () => {
  let service: TendersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TendersService],
    }).compile();

    service = module.get<TendersService>(TendersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
