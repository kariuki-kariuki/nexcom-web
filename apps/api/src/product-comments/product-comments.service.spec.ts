import { Test, TestingModule } from '@nestjs/testing';
import { ProductCommentsService } from './product-comments.service';

describe('ProductCommentsService', () => {
  let service: ProductCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCommentsService],
    }).compile();

    service = module.get<ProductCommentsService>(ProductCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
