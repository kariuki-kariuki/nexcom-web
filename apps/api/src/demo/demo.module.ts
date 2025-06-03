import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { Product } from 'src/shops/products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytic } from 'src/analytics/entity/analytic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Analytic])],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
