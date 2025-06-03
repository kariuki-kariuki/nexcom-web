import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytic } from 'src/analytics/entity/analytic.entity';
import { Product } from 'src/shops/products/entities/product.entity';
import { Repository } from 'typeorm';

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
