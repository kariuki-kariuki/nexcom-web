import { Test, TestingModule } from '@nestjs/testing';
import { ShopsService } from './shops.service';

describe('ShopsService', () => {
  let service: ShopsService;
  const mockShopsService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: ShopsService, useValue: mockShopsService }],
    }).compile();

    service = module.get<ShopsService>(ShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
