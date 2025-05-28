import {
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/users.service';
import { ProjectIdType } from 'src/@types/types';
import { PaymentsService } from '../payments/payments.service';
import { Cart } from '../carts/entities/cart.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly usersService: UsersService,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly paymentsService: PaymentsService,
  ) {}
  async create(createOrderDto: CreateOrderDto, userId: ProjectIdType) {
    const order = new Order();
    const user = await this.usersService.findById(userId);
    const { cartIds, phone } = createOrderDto;
    const cartItems = await this.getCartItems(cartIds);
    const total = await this.getOrderTotal(cartItems);

    order.cartItems = cartItems;
    order.totalAmount = total;
    order.user = user;
    const res = await this.paymentsService.stkPush({
      phone: phone.slice(1),
      amount: total,
    });
    if (res.ResponseCode === '0') {
      order.checkoutRequestId = res.CheckoutRequestID;
      order.merchantRequestID = res.MerchantRequestID;
      await this.updateCartItemStatus(cartItems, true);
      const savedOrder = await this.ordersRepo.save(order);
      return savedOrder;
    } else {
      throw new UnprocessableEntityException('Check Number and Try Again');
    }
  }

  private async updateCartItemStatus(cartItems: Cart[], state: boolean) {
    cartItems.map(async (item) => {
      item.ordered = state;
      return await this.cartRepository.save(item);
    });
  }

  private async getOrderTotal(cartItems: Cart[]): Promise<number> {
    const total = cartItems.reduce(
      (acc, currVal) => acc + currVal.size.price * currVal.quantity,
      0,
    );
    return total;
  }

  private async getCartItems(checkoutIds: string[]): Promise<Cart[]> {
    const checkoutItems = Promise.all(
      checkoutIds.map(
        async (id) => await this.cartRepository.findOneBy({ id }),
      ),
    );
    return checkoutItems;
  }

  async findAll(userId: ProjectIdType) {
    return this.ordersRepo.find({ where: { user: { id: userId } } });
  }

  async findOne(id: ProjectIdType) {
    return await this.ordersRepo.findOneBy({ id });
  }

  async findOneByChekoutID(checkoutRequestId: string) {
    return this.ordersRepo.findOneOrFail({
      where: { checkoutRequestId },
      relations: { cartItems: true },
    });
  }

  async updateFailed(order: Order) {
    return await this.ordersRepo.save(order);
  }

  async update() {} // userId: ProjectIdType, // updateOrderDto: UpdateOrderDto, // id: ProjectIdType,

  async remove(id: number, userId: number) {
    try {
      const order = await this.ordersRepo
        .createQueryBuilder()
        .delete()
        .from(Order)
        .where('id = :id', { id })
        .andWhere('user.id = :userId', { userId })
        .execute();
      if (order.affected !== 1) {
        throw new UnauthorizedException('You are not authorized');
      }
      return { status: 'success' };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('You are not authorized');
    }
  }
}
