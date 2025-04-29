import { Test, TestingModule } from '@nestjs/testing';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

describe('ShopsController', () => {
  let controller: ShopsController;
  const mockShopsService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsController],
      providers: [{ provide: ShopsService, useValue: mockShopsService }],
    }).compile();

    controller = module.get<ShopsController>(ShopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
