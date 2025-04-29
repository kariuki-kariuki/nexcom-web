import { Test, TestingModule } from '@nestjs/testing';
import { BlogImagesService } from './blog-images.service';

describe('BlogImagesService', () => {
  let service: BlogImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogImagesService],
    }).compile();

    service = module.get<BlogImagesService>(BlogImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
