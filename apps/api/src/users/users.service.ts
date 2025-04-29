import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { SearchUserDto } from './dto/search-users.dto';
import { GoogleUser } from '../auth/auth.service';
import { CreateConversationDTO } from '../chat/conversations/dto/create-conversation.dto';
import { ConversationsService } from '../chat/conversations/conversations.service';
import { AwsService } from '../aws/aws.service';
import { ProjectIdType } from 'src/@types/types';
import { Conversation } from 'src/chat/conversations/entities/Conversation.entity';
import { Image } from 'src/shops/product_images/entities/image.entity';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly awsService: AwsService,
    @Inject(forwardRef(() => ConversationsService))
    private readonly conversationsService: ConversationsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = this.usersRepository.create({
      ...createUserDto,
      apiKey: uuid4(),
      phone: '123-456-789',
      password: hashedPassword,
    });

    try {
      const savedUser = await this.usersRepository.save(user);

      delete savedUser.password;
      const message = `Hello ${user.firstName}. Welcome to Nexcom, the future of connected commerce. Feel free to ask me anything about our product.`;

      await this.createWelcomeConversation(savedUser.id, message);
      return savedUser;
    } catch (e) {
      throw new UnprocessableEntityException('failed to save user', e.message);
    }
  }

  async createGoogle(data: GoogleUser) {
    const user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.apiKey = uuid4();
    user.phone = '123-345-899';
    const initiator = await this.findOne('nexcom.bot@gmail.com');

    try {
      const newUser = await this.usersRepository.save(user);
      const createConversationDTO: CreateConversationDTO = {
        receiverId: newUser.id,
        message: `Hello ${newUser.firstName}. Welcome to COCO app. Feel free to ask me anything about our product.`,
      };
      await this.conversationsService.createConversation({
        createConversationDTO,
        initiatorId: initiator.id,
      });
      return newUser;
    } catch (e) {
      console.log(e);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // consolidate conversation creation
  private async createWelcomeConversation(userId: string, message: string) {
    const bot = await this.findOne('nexcom.bot@gmail.com');
    const createConversationDTO: CreateConversationDTO = {
      receiverId: userId,
      message,
    };
    await this.conversationsService.createConversation({
      createConversationDTO,
      initiatorId: bot.id,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: { shop: true },
    });

    return user;
  }

  update(id: ProjectIdType, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  async updateSecreteKey(id: string, secret: string) {
    const user = await this.usersRepository.findOneBy({ id });
    user.twoFAsecret = secret;
    user.enable2FA = true;
    this.usersRepository.update(id, user);
  }

  remove(id: ProjectIdType) {
    return `This action removes a #${id} user`;
  }

  async disable2FA(userId: ProjectIdType): Promise<UpdateResult> {
    return await this.usersRepository.update(
      { id: userId },
      { enable2FA: false, twoFAsecret: null },
    );
  }

  async findByApiKey(apiKey: string) {
    const user = await this.usersRepository.findOneBy({ apiKey: apiKey });
    delete user.password;
    return user;
  }

  async updateProfile(file: Express.Multer.File, userId: ProjectIdType) {
    const user = await this.findById(userId);
    const photoKey = await this.awsService.uploadFile(file, 'profile');
    try {
      if (user.avatar) {
        await this.awsService.deleteImage(user.avatar.url);
        user.avatar.url = photoKey;
      } else {
        const avatar = new Image();
        avatar.url = photoKey;
        user.avatar = avatar;
      }

      return this.usersRepository.save(user);
    } catch (err) {
      throw new UnprocessableEntityException('Failed to update profile photo.');
    }
  }

  async searchUser(dto: SearchUserDto) {
    let users = [];
    const lowerQuery = dto.text.toLowerCase();
    if (/^\S+@\S+$/.test(lowerQuery)) {
      users = await this.usersRepository
        .createQueryBuilder('user')
        .where('LOWER(user.firstName) LIKE :query', {
          query: `%${lowerQuery}%`,
        })
        .orWhere('LOWER(user.email) LIKE :query', { query: `%${lowerQuery}%` })
        .orWhere('LOWER(user.lastName) LIKE :query', {
          query: `%${lowerQuery}%`,
        })
        .getMany();
    } else {
      users = await this.usersRepository
        .createQueryBuilder('user')
        .where('LOWER(user.firstName) LIKE :query', {
          query: `%${lowerQuery}%`,
        })
        .orWhere('LOWER(user.lastName) LIKE :query', {
          query: `%${lowerQuery}%`,
        })
        .getMany();
    }

    return users;
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
}
