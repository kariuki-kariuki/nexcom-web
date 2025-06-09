import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Conversation } from './entities/Conversation.entity';
import {
  CreateConversationDTO,
  CreateGroupDTO,
} from './dto/create-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../messages/entities/message.entity';
import { INewConverSation } from 'utils/interfaces';
import { MessageState } from '../../@types/chat/chat';
import { ConversationType, ProjectIdType } from '../../@types/types';
import { AwsService } from '../../aws/aws.service';
import { ProductsService } from '../../shops/products/products.service';
import { User } from '../../users/entities/user.entity';
import { Image } from '../../shops/product_images/entities/image.entity';
import { WsException } from '@nestjs/websockets';

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
    @InjectRepository(Image) private imageRepo: Repository<Image>,
  ) {}

  async findAll(id: string) {
    const user = await this.usersRepository
      .createQueryBuilder('userr')
      .leftJoinAndSelect('userr.conversations', 'conversations')
      .leftJoinAndSelect('conversations.users', 'users')
      .leftJoinAndSelect('conversations.creator', 'creator')
      .leftJoinAndSelect('conversations.admins', 'admins')
      .leftJoinAndSelect('conversations.messages', 'messages')
      .leftJoinAndSelect('messages.product', 'product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('messages.user', 'user')
      .leftJoinAndSelect('messages.files', 'files')
      .leftJoinAndSelect('users.shop', 'shop')
      .leftJoinAndSelect('users.avatar', 'avatar')
      .orderBy('messages.created_at', 'ASC')
      .where('userr.id = :id', { id })
      .getOne();

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

      await this.createInitialMessage(createConversationDTO, initiator, convo);

      const newConvo = this.conversationRepo.findOne({
        where: { id: convo.id },
        relations: {
          users: { avatar: true },
          messages: { user: true, product: true },
        },
      });
      return newConvo;
    } catch (e) {
      console.error('Error creating conversation:', e);
      throw new Error('Failed to create conversation');
    }
  }

  async createGroup(userId: string, createGroupDTO: CreateGroupDTO) {
    const { membersId, groupName, file } = createGroupDTO;
    const user = await this.usersRepository.findOneByOrFail({ id: userId });
    const members = await Promise.all(
      membersId.map(
        async (id) => await this.usersRepository.findOneByOrFail({ id }),
      ),
    );

    const group = new Conversation();
    group.name = groupName;
    group.users = [...members, user];
    group.admins = [user];
    group.creator = user;
    group.type = ConversationType.GROUP;

    if (file) {
      const profile = new Image();
      profile.url = await this.awsService.uploadFile(file, 'groups');
      const savedProfile = await this.imageRepo.save(profile);
      group.profile = savedProfile;
    }

    try {
      const newGroup = await this.conversationRepo.save(group);
      newGroup.messages = [];
      return newGroup;
    } catch (e) {
      console.log(e);
      throw new WsException('Failed To Create group');
    }
  }

  async getAllConversation(userId: string): Promise<Conversation[]> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('users.conversations', 'conversations')
      .leftJoinAndSelect('conversations.users', 'users')
      .leftJoinAndSelect('users.shop', 'shop')
      .leftJoinAndSelect('users.avatar', 'avatar')
      .orderBy('messages.created_at', 'DESC')
      .where('user.id =: id', { id: userId })
      .getOne();

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
