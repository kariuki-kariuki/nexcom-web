import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { OrdersModule } from '../orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    forwardRef(() => OrdersModule),
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
