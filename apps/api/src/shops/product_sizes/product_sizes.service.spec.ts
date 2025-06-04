import { Test, TestingModule } from '@nestjs/testing';
import { ProductSizesService } from './product_sizes.service';

describe('ProductSizesService', () => {
  let service: ProductSizesService;
  const mockProductSizesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductSizesService,
          useValue: mockProductSizesService,
        },
      ],
    }).compile();

    service = module.get<ProductSizesService>(ProductSizesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
