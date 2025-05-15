import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStateDTO } from './dto/update-state.dto';
import { Message } from './entities/message.entity';
import { MessageState } from 'src/@types/chat/chat';
import { IncomingMessageBody } from '../dto/chat-gateway.dto';
import { Conversation } from '../conversations/entities/Conversation.entity';
import { User } from 'src/users/entities/user.entity';
import { Image } from 'src/shops/product_images/entities/image.entity';
import { AwsService } from 'src/aws/aws.service';
import { Product } from 'src/shops/products/entities/product.entity';
import { ProductStatus } from 'src/@types/product-status';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly awsService: AwsService,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createMessage(messageDTO: IncomingMessageBody, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const messageBody = messageDTO;
    const { productId, conversationId } = messageDTO;
    const conversation = await this.conversationRepo.findOne({
      where: {
        id: conversationId,
        users: { id: userId },
      },
    });

    if (!(user || conversation)) {
      throw new Error('Conversation not found');
    }
    const message = new Message();
    message.conversation = conversation;
    message.user = user;
    message.message = messageBody.message;

    if (messageBody.files.length > 0) {
      const files = Promise.all(
        messageBody.files.map(async (file) => {
          const image = new Image();
          image.url = await this.awsService.uploadFile(file, 'products');
          return await this.imageRepository.save(image);
        }),
      );
      message.files = await files;
    }
    try {
      if (productId) {
        const product = await this.productRepository.findOne({
          where: {
            id: productId,
            status: ProductStatus.PUBLISHED,
          },
        });

        if (product) {
          message.product = product;
        }
      }
      return await this.messageRepo.save(message);
    } catch (err) {
      console.log(err);
    }
  }

  async updateMessageState(updateBody: UpdateStateDTO, email: string) {
    if (updateBody.state === 'delivered') {
      // const messages = await this.messageRepo
      //   .createQueryBuilder('message')
      //   .leftJoinAndSelect('message.user', 'user')
      //   .where('user.email = :email', { email })
      //   .andWhere('message.state = :state', { state: MessageState.SENT })
      //   .getMany();
      // console.log(email);
      // return { email, state: MessageState.DELIVERED };
    } else {
      return {
        email,
        conversationId: updateBody.conversationId,
        state: MessageState.READ,
      };
    }
    //   try {
    //     messages.forEach(async (message) => {
    //       message.state = MessageState.DELIVERED;
    //       await this.messageRepo.save(message);
    //     });
    //     return {
    //       state: MessageState.DELIVERED,
    //       email,
    //     };
    //   } catch (e) {
    //     console.log('Failed to update state: ', e);
    //   }
    // } else {
    //   const messages = await this.messageRepo
    //     .createQueryBuilder('message')
    //     .leftJoinAndSelect('message.user', 'user')
    //     .where('user.email = :email', { email })
    //     .andWhere('message.state != :state', { state: MessageState.READ })
    //     .getMany();
    //   try {
    //     messages.forEach(async (message) => {
    //       message.state = MessageState.READ;
    //       await this.messageRepo.save(message);
    //     });
    //     return {
    //       state: MessageState.READ,
    //       email,
    //     };
    //   } catch (e) {
    //     console.log('Failed to update state: ', e);
    //   }
    // }
  }

  async save(message: Message) {
    await this.messageRepo.save(message);
  }
}
