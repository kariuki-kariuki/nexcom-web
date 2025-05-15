import { Module } from '@nestjs/common';
import { ProductSizesService } from './product_sizes.service';
import { ProductSizesController } from './product_sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from './entities/product_size.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize, Product])],
  controllers: [ProductSizesController],
  providers: [ProductSizesService],
  exports: [ProductSizesService],
})
export class ProductSizesModule {}
