import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { ProductsModule } from 'src/shops/products/products.module';
import { AwsModule } from 'src/aws/aws.module';
import { Conversation } from '../conversations/entities/Conversation.entity';
import { User } from 'src/users/entities/user.entity';
import { Image } from 'src/shops/product_images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Conversation, User, Image]),
    ProductsModule,
    AwsModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
