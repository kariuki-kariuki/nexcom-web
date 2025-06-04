import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Conversation } from '../conversations/entities/Conversation.entity';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../shops/products/entities/product.entity';
import { AwsModule } from '../../aws/aws.module';
import { Image } from '../../shops/product_images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Conversation, User, Image, Product]),
    AwsModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
