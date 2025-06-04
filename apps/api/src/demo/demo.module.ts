import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytic } from '../analytics/entity/analytic.entity';
import { Product } from '../shops/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Analytic])],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
