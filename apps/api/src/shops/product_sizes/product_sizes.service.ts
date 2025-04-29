import { Injectable } from '@nestjs/common';
import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';
import { ProductSize } from './entities/product_size.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { ProjectIdType } from 'src/@types/types';

@Injectable()
export class ProductSizesService {
  constructor(
    @InjectRepository(ProductSize)
    private sizeRepository: Repository<ProductSize>,
    private readonly productService: ProductsService,
  ) {}
  async create(createProductSizeDto: CreateProductSizeDto) {
    const size = new ProductSize();
    const product = await this.productService.findOne(
      createProductSizeDto.productId,
    );
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

  async update(id: ProjectIdType, updateProductSizeDto: UpdateProductSizeDto) {
    const sizeToUpdate = await this.findOne(id);
    const { size = sizeToUpdate.size, price = sizeToUpdate.price } =
      updateProductSizeDto;
    sizeToUpdate.size = size;
    sizeToUpdate.price = price;
    return this.sizeRepository.save(sizeToUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} productSize`;
  }
}
