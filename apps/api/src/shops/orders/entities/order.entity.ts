import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { OrderState, ProjectIdType } from 'src/@types/types';
import { Cart } from 'src/shops/carts/entities/cart.entity';
import { Payment } from 'src/shops/payments/entities/payment.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @PrimaryGeneratedColumn()
  orderNumber: number;

  @Exclude()
  @Column()
  checkoutRequestId: string;

  @Exclude()
  @Column()
  merchantRequestID: string;

  @Column()
  totalAmount: number;

  @Exclude()
  @Column({ nullable: true })
  resultCode: number;

  @Exclude()
  @Column({ nullable: true })
  resultDesc: string;

  @Column({ default: OrderState.PENDING })
  status: OrderState;

  @OneToMany(() => Cart, (cart) => cart.orders)
  cartItems: Cart[];

  @OneToOne(() => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
