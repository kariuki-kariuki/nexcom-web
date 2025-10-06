import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AwsService } from '../aws/aws.service';
import { CategoriesService } from './categories/categories.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { Image } from './product_images/entities/image.entity';
import { Order } from './orders/entities/order.entity';
import { Product } from './products/entities/product.entity';
import { UserRoles, ProjectIdType } from '../@types/types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private shopRepository: Repository<Shop>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly awsService: AwsService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(
    createShopDto: CreateShopDto,
    email: string,
    file: Express.Multer.File,
  ) {
    const { address, categoryId, description, phone, name } = createShopDto;

    const shopsWithName = await this.shopRepository.findOneBy({ name });
    if (shopsWithName) {
      throw new UnprocessableEntityException('ShopName already exist');
    }
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        relations: { shop: true },
      });
      if (user.shop) {
        throw new ForbiddenException('You already have a shop');
      }
      const category = await this.categoryService.findOne(categoryId);
      const shop = this.shopRepository.create({
        address,
        category,
        description,
        phone: parseInt(phone),
        name,
      });

      if (file) {
        const imageUrl = await this.awsService.uploadFile(file, 'shop');
        const banner = new Image();
        banner.url = imageUrl;
        banner.altText = `${name} shop bunner Image`;
        shop.bannerImage = banner;
      }

      const myShop = await this.shopRepository.save(shop);
      if (myShop) {
        user.role = UserRoles.SHOP_ADMIN;
        await this.usersRepository.save(user);
      }

      user.shop = myShop
      await this.usersRepository.save(user);

      return myShop;
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
      .leftJoinAndSelect('user.avatar', 'avatar')
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
      .where('LOWER(shop.name) = :name', { name: name.toLocaleLowerCase() })
      .getOne();
    if (!shop.products) {
      shop.products = [];
    }
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
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.shop', 'shop')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.product_sizes', 'product_sizes')
      .leftJoinAndSelect('product.analytics', 'analytics')
      .leftJoinAndSelect('product.cartItems', 'cartItems')
      .leftJoinAndSelect('cartItems.size', 'size')
      .where('shop.id = :id', { id })
      .getMany();
    return products || [];
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

  async getOrders(shopId: string) {
    return this.ordersRepository.find({
      where: {
        cartItems: {
          product: {
            shop: {
              id: shopId,
            },
          },
        },
      },
    });
  }
}
