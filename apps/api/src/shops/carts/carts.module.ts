import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { ProductsModule } from '../products/products.module';
import { AwsModule } from 'src/aws/aws.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { ProductSizesModule } from '../product_sizes/product_sizes.module';

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
