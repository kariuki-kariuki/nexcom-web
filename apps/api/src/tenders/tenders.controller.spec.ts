import { Test, TestingModule } from '@nestjs/testing';
import { TendersController } from './tenders.controller';
import { TendersService } from './tenders.service';

describe('TendersController', () => {
  let controller: TendersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TendersController],
      providers: [TendersService],
    }).compile();

    controller = module.get<TendersController>(TendersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
