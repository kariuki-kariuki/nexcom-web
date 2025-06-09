import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/Conversation.entity';
import { ConversationsService } from './conversations.service';
import { Message } from '../messages/entities/message.entity';
import { AwsModule } from '../../aws/aws.module';
import { ProductsModule } from '../../shops/products/products.module';
import { User } from '../../users/entities/user.entity';
import { Image } from '../../shops/product_images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message, User, Image]),
    ProductsModule,
    AwsModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
