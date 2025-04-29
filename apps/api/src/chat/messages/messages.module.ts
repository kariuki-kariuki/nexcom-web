import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { ProductsModule } from 'src/shops/products/products.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ProductsModule, AwsModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
