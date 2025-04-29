import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  const mockOrdersService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: OrdersService, useValue: mockOrdersService }],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
