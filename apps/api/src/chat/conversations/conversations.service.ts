import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Conversation } from './entities/Conversation.entity';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../messages/entities/message.entity';
import { MessageState } from 'src/@types/chat/chat';
import { ProjectIdType } from 'src/@types/types';
import { ProductsService } from 'src/shops/products/products.service';
import { AwsService } from 'src/aws/aws.service';
import { User } from 'src/users/entities/user.entity';
import { INewConverSation } from 'utils/interfaces';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly productsService: ProductsService,
    private readonly awsService: AwsService,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async findAll(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        conversations: {
          users: { shop: true },
          messages: { user: true, product: true },
        },
      },
    });

    if (!user) {
      throw new UnprocessableEntityException('User not found.');
    }
    user.conversations = user.conversations.map((conversation) => {
      // Filter out the user with the specified userId
      conversation.users = conversation.users.filter((user) => user.id !== id);
      return conversation;
    });

    return user.conversations;
  }
  async createConversation({
    createConversationDTO,
    initiatorId,
  }: INewConverSation) {
    const initiator = await this.usersRepository.findOneBy({ id: initiatorId });
    if (!initiator) {
      throw new Error('Initiator not found');
    }

    const receiver = await this.usersRepository.findOneBy({
      id: createConversationDTO.receiverId,
    });
    if (!receiver) {
      throw new Error('Receiver not found');
    }

    // Check if conversation exists
    const conversations = await this.getAllConversation(initiator.id);

    const res = conversations.find(
      (convo) => convo.users[0].id === createConversationDTO.receiverId,
    );

    if (res) {
      return res;
    }

    // Create new conversation
    const conversation = new Conversation();
    conversation.users = [initiator, receiver];

    try {
      // Transactional save
      const convo = await this.conversationRepo.save(conversation);

      const message = await this.createInitialMessage(
        createConversationDTO,
        initiator,
        convo,
      );

      convo.messages = [message];
      return convo;
    } catch (e) {
      console.error('Error creating conversation:', e);
      throw new Error('Failed to create conversation');
    }
  }

  async getAllConversation(userId: string): Promise<Conversation[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: {
        conversations: {
          users: { shop: true },
          messages: { user: true, product: true },
        },
      },
    });

    if (!user) {
      throw new UnprocessableEntityException('User not found.');
    }
    user.conversations = user.conversations.map((conversation) => {
      // Filter out the user with the specified userId
      conversation.users = conversation.users.filter(
        (user) => user.id !== userId,
      );
      return conversation;
    });

    return user.conversations;
  }

  private async createInitialMessage(
    createConversationDTO: CreateConversationDTO,
    initiator: User,
    conversation: Conversation,
  ) {
    const { productId, message: messageText } = createConversationDTO;

    const message = new Message();
    message.message = messageText;
    message.user = initiator;
    message.conversation = conversation;

    if (productId) {
      const product = await this.productsService.findOne(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      message.product = product;
      message.productId = productId;
    }
    const savedMessage = await this.messageRepo.save(message);
    return savedMessage;
  }

  async findOne(id: ProjectIdType) {
    const convo = this.conversationRepo.findOneBy({ id });
    if (convo) {
      return convo;
    } else {
      throw new NotFoundException('Not found');
    }
  }

  async findConversation(
    specificUserEmail: string,
    state: MessageState,
    conversationId?: ProjectIdType,
  ) {
    const baseQuery = this.conversationRepo
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.users', 'conversationUser')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('message.user', 'messageUser')
      .where('conversationUser.email = :specificUserEmail', {
        specificUserEmail,
      })
      .andWhere('messageUser.email != :specificUserEmail', {
        specificUserEmail,
      })
      .orderBy('message.created_at', 'ASC');

    // Adjust the query based on the state
    if (state === MessageState.DELIVERED) {
      baseQuery.andWhere('message.state = :sentState', {
        sentState: MessageState.SENT,
      });
    } else {
      baseQuery.andWhere('message.state != :sentState', {
        sentState: MessageState.READ,
      });

      if (conversationId) {
        baseQuery.andWhere('conversation.id = :conversationId', {
          conversationId,
        });
      }
    }

    // Fetch conversations
    const conversations = await baseQuery.getMany();

    // Update message states and save
    const newState =
      state === MessageState.DELIVERED
        ? MessageState.DELIVERED
        : MessageState.READ;
    for (const conversation of conversations) {
      for (const message of conversation.messages) {
        message.state = newState;
        await this.messageRepo.save(message);
      }
    }
    const user = await this.usersRepository.findOneBy({
      email: specificUserEmail,
    });
    // Return the result
    return {
      userId: user.id,
      state: newState,
      ...(conversationId ? { conversationId: conversationId } : {}),
    };
  }
}
