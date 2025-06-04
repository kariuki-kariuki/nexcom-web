import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { ProjectIdType } from '../../@types/types';
import { UsersService } from '../../users/users.service';

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
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
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
    return cartItems;
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
        user: { id: userId },
        ordered: false,
      },
      relations: {
        user: true,
        product: {
          images: true,
          product_sizes: true,
        },
      },
    });
    if (!cart) {
      throw new ForbiddenException('You cannot perfom such action');
    }
    const { sizeId } = updateCartDto;
    if (sizeId) {
      const size = cart.product.product_sizes.find(
        (size) => size.id === sizeId,
      );
      cart.size = size;
      if (!size) {
        throw new ForbiddenException('You cannot perfom such action');
      }
    }
    cart.quantity = updateCartDto.quantity ?? cart.quantity;
    cart.color = updateCartDto.color ?? cart.color;
    cart.customer_description =
      updateCartDto.customer_description ?? cart.customer_description;
    return await this.cartRepo.save(cart);
  }

  remove(id: ProjectIdType) {
    return `This action removes a #${id} cart`;
  }
}
