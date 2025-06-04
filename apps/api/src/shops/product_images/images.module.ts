import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { AwsModule } from '../../aws/aws.module';
import { Product } from '../products/entities/product.entity';
import { WeaviateModule } from '../../weaviate/weaviate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image, Product]),
    WeaviateModule,
    AwsModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
