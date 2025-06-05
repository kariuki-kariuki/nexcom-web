import { Test, TestingModule } from '@nestjs/testing';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

describe('ShopsController', () => {
  let controller: ShopsController;
  const mockShopsService = {
    findOneByName: jest.fn((dto) => {
      return dto;
    }),
  };
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

  it('should return many shops', () => {
    const query = 'All';
    expect(controller.findAll(query)).toEqual(query);
    expect(mockShopsService.findOneByName).toHaveBeenCalledWith(query);
  });
});
