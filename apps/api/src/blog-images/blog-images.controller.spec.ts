import { Test, TestingModule } from '@nestjs/testing';
import { BlogImagesController } from './blog-images.controller';
import { BlogImagesService } from './blog-images.service';

describe('BlogImagesController', () => {
  let controller: BlogImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogImagesController],
      providers: [BlogImagesService],
    }).compile();

    controller = module.get<BlogImagesController>(BlogImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
