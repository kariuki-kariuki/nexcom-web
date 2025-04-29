import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ImagesModule } from '../product_images/images.module';
import { AwsModule } from '../../aws/aws.module';
import { ShopsModule } from 'src/shops/shops.module';
import { CategoriesModule } from '../categories/categories.module';
import { WeaviateModule } from 'src/weaviate/weaviate.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    CategoriesModule,
    ImagesModule,
    TypeOrmModule.forFeature([Product]),
    AwsModule,
    WeaviateModule,
    forwardRef(() => ShopsModule),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
