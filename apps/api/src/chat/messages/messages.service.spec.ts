import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;
  const mockMessageService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: MessagesService,
          useValue: mockMessageService,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
