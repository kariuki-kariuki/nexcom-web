import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ImagesModule } from '../product_images/images.module';
import { AwsModule } from '../../aws/aws.module';
import { Shop } from '../entities/shop.entity';
import { Category } from '../categories/entities/category.entity';
import { ProductSize } from '../product_sizes/entities/product_size.entity';
import { Analytic } from '../../analytics/entity/analytic.entity';
import { WeaviateModule } from '../../weaviate/weaviate.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    ImagesModule,
    TypeOrmModule.forFeature([Product, Analytic, Shop, Category, ProductSize]),
    AwsModule,
    WeaviateModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
