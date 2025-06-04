import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;
  const mockImageService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: ImagesService,
          useValue: mockImageService,
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
