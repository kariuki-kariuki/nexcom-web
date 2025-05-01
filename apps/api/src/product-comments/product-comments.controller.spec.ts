import { Test, TestingModule } from '@nestjs/testing';
import { ProductCommentsController } from './product-comments.controller';
import { ProductCommentsService } from './product-comments.service';

describe('ProductCommentsController', () => {
  let controller: ProductCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCommentsController],
      providers: [ProductCommentsService],
    }).compile();

    controller = module.get<ProductCommentsController>(
      ProductCommentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
