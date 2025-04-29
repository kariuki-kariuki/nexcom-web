import { Test, TestingModule } from '@nestjs/testing';
import { ProductSizesService } from './product_sizes.service';

describe('ProductSizesService', () => {
  let service: ProductSizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSizesService],
    }).compile();

    service = module.get<ProductSizesService>(ProductSizesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
