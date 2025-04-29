import { Module } from '@nestjs/common';
import { ProductSizesService } from './product_sizes.service';
import { ProductSizesController } from './product_sizes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from './entities/product_size.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize]), ProductsModule],
  controllers: [ProductSizesController],
  providers: [ProductSizesService],
  exports: [ProductSizesService],
})
export class ProductSizesModule {}
