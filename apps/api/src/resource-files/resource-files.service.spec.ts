import { Test, TestingModule } from '@nestjs/testing';
import { ResourceFilesService } from './resource-files.service';

describe('ResourceFilesService', () => {
  let service: ResourceFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceFilesService],
    }).compile();

    service = module.get<ResourceFilesService>(ResourceFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
