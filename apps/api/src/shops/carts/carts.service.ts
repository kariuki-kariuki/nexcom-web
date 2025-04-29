import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProjectIdType } from 'src/@types/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { AwsService } from 'src/aws/aws.service';
import { ProductsService } from '../products/products.service';
import { ProductSizesService } from '../product_sizes/product_sizes.service';

type updateType = {
  id: ProjectIdType;
  updateCartDto: UpdateCartDto;
  userId: ProjectIdType;
};

type createType = {
  createCartDto: CreateCartDto;
  userId: string;
};
@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    private readonly awsService: AwsService,
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
    private readonly productSizeService: ProductSizesService,
  ) {}

  async create({ createCartDto, userId }: createType) {
    const { color, productId, quantity, sizeId } = createCartDto;
    const user = await this.usersService.findById(userId);
    const product = await this.productService.findOne(productId);
    const priceSize = product.product_sizes.find((size) => size.id === sizeId);
    const cartItem = new Cart();
    cartItem.color = color;
    cartItem.size = priceSize;
    cartItem.user = user;
    cartItem.product = product;
    cartItem.quantity = quantity;
    try {
      const cartedItem = this.cartRepo.save(cartItem);
      return cartedItem;
    } catch (e) {
      throw new UnprocessableEntityException('Failed to create item');
    }
  }

  async findAll({ userId }: { userId: string }) {
    const cartItems = await this.cartRepo.find({
      where: {
        user: { id: userId },
        ordered: false,
      },
      relations: {
        product: {
          images: true,
        },
        size: true,
      },
    });
    if (cartItems) {
      const cartWithImg = await Promise.all(
        cartItems.map(async (item) => {
          item.product.images = await Promise.all(
            item.product.images?.map(async (image) => ({
              ...image,
              url: await this.awsService.getSignedURL(image.url),
            })),
          );
          return item;
        }),
      );
      return cartWithImg;
    } else {
      throw new NotFoundException('No Items found in cart');
    }
  }

  async findOne(id: ProjectIdType) {
    const cartItem = await this.cartRepo.findOne({
      where: { id },
      relations: { product: true, size: true },
    });
    return cartItem;
  }

  async updateState(cart: Cart) {
    return await this.cartRepo.save(cart);
  }

  async update({ id, userId, updateCartDto }: updateType) {
    const cart = await this.cartRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        product: {
          product_sizes: true,
        },
      },
    });
    if (!cart || cart.user.id !== userId) {
      throw new UnauthorizedException();
    }
    const { sizeId } = updateCartDto;
    const size = cart.product.product_sizes.find((size) => size.id === sizeId);
    if (!size) {
      throw new ForbiddenException('You cannot perfom such action');
    }
    cart.quantity = updateCartDto.quantity ?? cart.quantity;
    cart.color = updateCartDto.color ?? cart.color;
    cart.customer_description =
      updateCartDto.customer_description ?? cart.customer_description;
    cart.size = size;
    return await this.cartRepo.save(cart);
  }

  remove(id: ProjectIdType) {
    return `This action removes a #${id} cart`;
  }
}
