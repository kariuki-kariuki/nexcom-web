import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytic } from './entity/analytic.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/shops/products/entities/product.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytic)
    private readonly analyticRepository: Repository<Analytic>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll({ shopId }: { shopId: string }) {
    const analyticsByMonth = await this.analyticRepository
      .createQueryBuilder('analytic')
      .innerJoin('analytic.product', 'product')
      .where('product.shopId = :shopId', { shopId })
      .select("DATE_TRUNC('month', analytic.created_at)", 'month')
      .addSelect('COUNT(*)', 'count')
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    return analyticsByMonth.map((row) => ({
      month: new Date(row.month).getMonth() + 1,
      count: parseInt(row.count, 10),
    }));
  }
}
