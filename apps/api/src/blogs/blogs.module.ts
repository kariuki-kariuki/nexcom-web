import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { AwsModule } from '../aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  imports: [AwsModule, TypeOrmModule.forFeature([Blog])],
  exports: [BlogsService],
})
export class BlogsModule {}
