import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ImagesModule } from '../product_images/images.module';
import { AwsModule } from '../../aws/aws.module';
import { WeaviateModule } from 'src/weaviate/weaviate.module';
import { Analytic } from 'src/analytics/entity/analytic.entity';
import { Shop } from '../entities/shop.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    ImagesModule,
    TypeOrmModule.forFeature([Product, Analytic, Shop, Category]),
    AwsModule,
    WeaviateModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
