import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Conversation } from './entities/Conversation.entity';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesService } from '../messages/messages.service';
import { Message } from '../messages/entities/message.entity';
import { UsersService } from '../../users/users.service';
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
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly messageService: MessagesService,
    private readonly productsService: ProductsService,
    private readonly awsService: AwsService,
  ) {}

  async findAll(id: string) {
    return this.userService.getAllConversation(id);
  }
  async createConversation({
    createConversationDTO,
    initiatorId,
  }: INewConverSation) {
    const initiator = await this.userService.findById(initiatorId);
    if (!initiator) {
      throw new Error('Initiator not found');
    }

    const receiver = await this.userService.findById(
      createConversationDTO.receiverId,
    );
    if (!receiver) {
      throw new Error('Receiver not found');
    }

    // Check if conversation exists
    const conversations = await this.userService.getAllConversation(
      initiator.id,
    );

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
      product.images = await this.awsService.getMultipleUrls(product.images);
    }

    await this.messageService.createMessage(message);
    delete message.conversation; // Avoid circular references in the response

    return message;
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
        await this.messageService.save(message);
      }
    }
    const user = await this.userService.findOne(specificUserEmail);
    // Return the result
    return {
      userId: user.id,
      state: newState,
      ...(conversationId ? { conversationId: conversationId } : {}),
    };
  }
}
