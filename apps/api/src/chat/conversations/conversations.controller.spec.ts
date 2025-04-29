import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';

describe('ConversationsController', () => {
  let controller: ConversationsController;

  const mockConvoService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationsController],
      providers: [
        ConversationsService,
        {
          provide: ConversationsService,
          useValue: mockConvoService,
        },
      ],
    }).compile();

    controller = module.get<ConversationsController>(ConversationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
