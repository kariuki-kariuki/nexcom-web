import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStateDTO } from './dto/update-state.dto';
import { Message } from './entities/message.entity';
import { MessageState } from 'src/@types/chat/chat';
import { ProductsService } from 'src/shops/products/products.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly productsService: ProductsService,
  ) {}

  async createMessage(message: Message) {
    const { productId } = message;
    try {
      if (productId) {
        message.product = await this.productsService.findOne(message.productId);
        const savedMessage = await this.messageRepo.save(message);
        return savedMessage;
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
