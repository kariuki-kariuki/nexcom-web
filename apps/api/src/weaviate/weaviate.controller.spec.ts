import { Test, TestingModule } from '@nestjs/testing';
import { WeaviateController } from './weaviate.controller';
import { WeaviateService } from './weaviate.service';

describe('WeaviateController', () => {
  let controller: WeaviateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaviateController],
      providers: [WeaviateService],
    }).compile();

    controller = module.get<WeaviateController>(WeaviateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
