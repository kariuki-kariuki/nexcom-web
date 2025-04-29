import { forwardRef, Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/Conversation.entity';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../../users/users.module';
import { ConversationsService } from './conversations.service';
import { ProductsModule } from 'src/shops/products/products.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Conversation]),
    MessagesModule,
    ProductsModule,
    AwsModule,
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
