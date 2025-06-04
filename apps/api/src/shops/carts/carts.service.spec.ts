import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';

describe('CartsService', () => {
  let service: CartsService;
  const mockCartsService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: CartsService, useValue: mockCartsService }],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
