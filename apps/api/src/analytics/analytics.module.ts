import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytic } from './entity/analytic.entity';
import { Product } from '../shops/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Analytic, Product])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
