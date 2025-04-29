import { forwardRef, Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { AwsModule } from '../../aws/aws.module';
import { ProductsModule } from '../products/products.module';
import { WeaviateModule } from 'src/weaviate/weaviate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    WeaviateModule,
    AwsModule,
    forwardRef(() => ProductsModule),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
