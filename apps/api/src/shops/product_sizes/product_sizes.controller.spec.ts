import { Test, TestingModule } from '@nestjs/testing';
import { ProductSizesController } from './product_sizes.controller';
import { ProductSizesService } from './product_sizes.service';

describe('ProductSizesController', () => {
  let controller: ProductSizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSizesController],
      providers: [ProductSizesService],
    }).compile();

    controller = module.get<ProductSizesController>(ProductSizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
