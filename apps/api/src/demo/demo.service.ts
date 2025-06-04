import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytic } from '../analytics/entity/analytic.entity';
import { Product } from '../shops/products/entities/product.entity';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Analytic)
    private analyticRepository: Repository<Analytic>,
  ) {}

  async findAllProducts() {
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.shop', 'shop')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.product_sizes', 'product_sizes')
      .leftJoinAndSelect('product.analytics', 'analytics')
      .leftJoinAndSelect('product.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.size', 'size')
      .where('shop.name = :name', { name: 'ShopX' })
      .getMany();
    return products;
  }
}
