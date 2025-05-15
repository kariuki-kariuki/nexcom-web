import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';
import { ProductSize } from './entities/product_size.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectIdType } from 'src/@types/types';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductSizesService {
  constructor(
    @InjectRepository(ProductSize)
    private sizeRepository: Repository<ProductSize>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  async create(createProductSizeDto: CreateProductSizeDto, userId) {
    const size = new ProductSize();
    const { productId } = createProductSizeDto;

    const product = await this.productsWithPermisions(productId, userId);
    size.price = createProductSizeDto.price;
    size.size = createProductSizeDto.size;
    size.product = product;
    return this.sizeRepository.save(size);
  }

  findAll() {
    return `This action returns all productSizes`;
  }

  findOne(id: ProjectIdType) {
    return this.sizeRepository.findOneBy({ id });
  }

  async update(
    id: ProjectIdType,
    updateProductSizeDto: UpdateProductSizeDto,
    shopId: string,
  ) {
    const sizeToUpdate = await this.sizeRepository.findOne({
      where: {
        id: updateProductSizeDto.productId,
        product: {
          shop: { id: shopId },
        },
      },
    });
    const { size = sizeToUpdate.size, price = sizeToUpdate.price } =
      updateProductSizeDto;
    sizeToUpdate.size = size;
    sizeToUpdate.price = price;
    return this.sizeRepository.save(sizeToUpdate);
  }

  async productsWithPermisions(productId: string, userId: string) {
    const product = await this.productRepo.findOne({
      where: {
        id: productId,
        shop: { user: { id: userId } },
      },
    });
    if (!product) {
      throw new UnauthorizedException('You cannot Perfom the Action');
    }
    return product;
  }

  remove(id: number) {
    return `This action removes a #${id} productSize`;
  }
}
