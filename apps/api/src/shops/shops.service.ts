import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from '../aws/aws.service';
import { ProjectIdType } from 'src/@types/types';
import { CategoriesService } from './categories/categories.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { User } from 'src/users/entities/user.entity';
import { Image } from './product_images/entities/image.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly awsService: AwsService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(
    createShopDto: CreateShopDto,
    email: string,
    file: Express.Multer.File,
  ) {
    const { address, categoryId, description, phone, name } = createShopDto;

    const shopsWithName = await this.shopRepository.findBy({ name });
    if (shopsWithName) {
      throw new UnprocessableEntityException('ShopName already exist');
    }
    try {
      const user = await this.usersRepository.findOneBy({ email });
      const imageUrl = await this.awsService.uploadFile(file, 'shop');
      const category = await this.categoryService.findOne(categoryId);
      const banner = new Image();
      banner.url = imageUrl;
      banner.altText = `${name} shop bunner Image`;
      const shop = this.shopRepository.create({
        address,
        category,
        description,
        phone: parseInt(phone),
        name,
        user,
        bannerImage: banner,
      });
      const shops = await this.shopRepository.save(shop);

      return shops;
    } catch (e) {
      throw new UnprocessableEntityException('Name already taken');
    }
  }

  async findAll() {
    const shops = await this.shopRepository.find({
      relations: {
        user: true,
      },
    });
    return shops;
  }
  async findUserShop(id: string) {
    return this.shopRepository.findOne({
      where: {
        user: {
          id,
        },
      },
    });
  }

  async findOne(id: ProjectIdType) {
    return await this.shopRepository.findOneBy({ id });
  }

  async findOneByName(name: string) {
    if (name === 'all') {
      return this.findAll();
    }
    const shop = await this.shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.user', 'user')
      .leftJoinAndSelect('shop.bannerImage', 'bannerImage')
      .leftJoinAndSelect('shop.category', 'category')
      .leftJoinAndSelect(
        'shop.products',
        'products',
        'products.status = :status',
        { status: 'Published' },
      )
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.product_sizes', 'product_sizes')
      .where('LOWER(shop.name) = :name', { name })
      .getOne();
    return shop;
  }

  async findShopWithProducts(id: ProjectIdType) {
    try {
      const shop = await this.shopRepository
        .createQueryBuilder('shop')
        .leftJoinAndSelect('shop.products', 'products')
        .leftJoinAndSelect('products.images', 'images')
        .where('shop.id = :id', { id })
        .leftJoinAndSelect('products.product_sizes', 'product_sizes')
        .andWhere('products.status = :status', { status: 'Published' })
        .leftJoinAndSelect('shop.user', 'user')
        .getOne();
      return shop;
    } catch (e) {
      throw new UnprocessableEntityException('An error occured.');
    }
  }

  async findMyShop(id: string) {
    const shop = await this.shopRepository
      .createQueryBuilder('shop')
      .leftJoinAndSelect('shop.products', 'products')
      .leftJoinAndSelect('products.images', 'images')
      .leftJoinAndSelect('products.product_sizes', 'product_sizes')
      .leftJoinAndSelect('products.analytics', 'analytics')
      .leftJoinAndSelect('products.cartItems', 'cartItems')
      .where('shop.id = :id', { id })
      .getOne();
    return shop;
  }

  async update(id: string, updateShopDto: UpdateShopDto, userId: string) {
    const user = await this.findOne(userId);
    const shop = await this.findOne(id);
    if (shop.user.id !== user.id) {
      throw new UnauthorizedException('Unauthorized');
    }
    const { name = shop.name, categoryId = shop.category.id } = updateShopDto;
    const category = await this.categoryService.findOne(categoryId);
    shop.name = name;
    shop.category = category;

    return updateShopDto;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
