import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { AwsModule } from '../../aws/aws.module';
import { ProductsModule } from '../products/products.module';
import { CartsModule } from '../carts/carts.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    ProductsModule,
    CartsModule,
    AwsModule,
    forwardRef(() => PaymentsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
