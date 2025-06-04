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
import { Exclude } from 'class-transformer';
import { ProjectIdType, OrderState } from '../../../@types/types';
import { Cart } from '../../carts/entities/cart.entity';
import { Payment } from '../../payments/entities/payment.entity';

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

  @OneToMany(() => Cart, (cart) => cart.orders, { eager: true })
  cartItems: Cart[];

  @OneToOne(() => Payment, (payment) => payment.order, { eager: true })
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
