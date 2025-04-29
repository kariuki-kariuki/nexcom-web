import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { AwsService } from 'src/aws/aws.service';
import { ProjectIdType } from 'src/@types/types';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly awsService: AwsService,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.name = createCategoryDto.name;
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findProducts() {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .leftJoinAndSelect('products.images', 'images') // Assuming 'images' is a relation on the product entity
      .leftJoinAndSelect('products.product_sizes', 'product_sizes')
      .leftJoinAndSelect('products.shop', 'shop')
      .where('products.status = :status', { status: 'Published' })
      .getMany();

    await Promise.all(
      categories.map(async (categorie) => {
        await Promise.all(
          categorie.products.map(async (product) => {
            product.images = await this.awsService.getMultipleUrls(
              product.images,
            );
          }),
        );
      }),
    );

    return categories;
  }

  findOne(id: ProjectIdType) {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(id: ProjectIdType, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    category.name = updateCategoryDto.name;

    return this.categoryRepository.save(category);
  }

  remove(id: ProjectIdType) {
    return `This action removes a #${id} category`;
  }
}
