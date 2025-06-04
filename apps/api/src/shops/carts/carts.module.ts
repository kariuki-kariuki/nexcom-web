import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductSizesModule } from '../product_sizes/product_sizes.module';
import { AwsModule } from '../../aws/aws.module';
import { UsersModule } from '../../users/users.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [
    ProductsModule,
    AwsModule,
    ProductSizesModule,
    UsersModule,
    TypeOrmModule.forFeature([Cart]),
  ],
  exports: [CartsService],
})
export class CartsModule {}
