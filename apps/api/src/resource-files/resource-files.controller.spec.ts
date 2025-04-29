import { Test, TestingModule } from '@nestjs/testing';
import { ResourceFilesController } from './resource-files.controller';
import { ResourceFilesService } from './resource-files.service';

describe('ResourceFilesController', () => {
  let controller: ResourceFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceFilesController],
      providers: [ResourceFilesService],
    }).compile();

    controller = module.get<ResourceFilesController>(ResourceFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
