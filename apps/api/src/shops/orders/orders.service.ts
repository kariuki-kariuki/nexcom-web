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
import { ProductsService } from '../products/products.service';
import { AwsService } from '../../aws/aws.service';
import { ProjectIdType } from 'src/@types/types';
import { CartsService } from '../carts/carts.service';
import { PaymentsService } from '../payments/payments.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly productService: ProductsService,
    private readonly awsService: AwsService,
    private readonly cartService: CartsService,
    private readonly paymentsService: PaymentsService,
  ) {}
  async create(createOrderDto: CreateOrderDto, userId: ProjectIdType) {
    const order = new Order();
    const user = await this.usersService.findById(userId);
    const { cartIds, phone } = createOrderDto;
    const cartItems = await Promise.all(
      cartIds.map(async (id) => await this.cartService.findOne(id)),
    );
    const total = cartItems.reduce(
      (acc, currVal) => acc + currVal.size.price * currVal.quantity,
      0,
    );
    cartItems.map(async (item) => {
      item.ordered = true;
      return await this.cartService.updateState(item);
    });
    order.cartItems = cartItems;
    order.totalAmount = total;
    order.user = user;
    const res = await this.paymentsService.stkPush({ phone: phone.slice(1) });
    if (res.ResponseCode === '0') {
      order.checkoutRequestId = res.CheckoutRequestID;
      order.merchantRequestID = res.MerchantRequestID;
      const savedOrder = await this.ordersRepo.save(order);
      return savedOrder;
    } else {
      throw new UnprocessableEntityException('Check Number and Try Again');
    }
  }

  async findAll(userId: ProjectIdType) {
    this.ordersRepo.find({ where: { user: { id: userId } } });
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
