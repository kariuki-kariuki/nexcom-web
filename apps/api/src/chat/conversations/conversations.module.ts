import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/Conversation.entity';
import { ConversationsService } from './conversations.service';
import { ProductsModule } from 'src/shops/products/products.module';
import { AwsModule } from 'src/aws/aws.module';
import { Message } from '../messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message, User]),
    ProductsModule,
    AwsModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
