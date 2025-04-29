import { Module } from '@nestjs/common';
import { BlogImagesService } from './blog-images.service';
import { BlogImagesController } from './blog-images.controller';
import { AwsModule } from '../aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogImage } from './entities/blog-image.entity';
import { BlogsModule } from '../blogs/blogs.module';

@Module({
  imports: [AwsModule, TypeOrmModule.forFeature([BlogImage]), BlogsModule],
  controllers: [BlogImagesController],
  providers: [BlogImagesService],
  exports: [BlogImagesService],
})
export class BlogImagesModule {}
