import { Test, TestingModule } from '@nestjs/testing';
import { ConversationsService } from './conversations.service';

describe('ConversationsService', () => {
  let service: ConversationsService;
  const mockConversationService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationsService,
        {
          provide: ConversationsService,
          useValue: mockConversationService,
        },
      ],
    }).compile();

    service = module.get<ConversationsService>(ConversationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
