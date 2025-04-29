import { Exclude } from 'class-transformer';
import { ProjectIdType } from 'src/@types/types';
import { Order } from 'src/shops/orders/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column()
  merchantRequestId: string;

  @Column()
  checkoutRequestId: string;

  @Column()
  resultCode: number;

  @Column()
  resultDesc: string;

  @Column()
  amount: number;

  @Column()
  mpesaReceiptNumber: string;

  @Column()
  transactionDate: Date;

  @Column()
  phoneNumber: number;

  @Column({ default: 'pending' }) // pending, success, failed
  status: string;

  @Column({ nullable: true }) // Reason for failure, if any
  failureReason: string;

  @Column({ default: false })
  verified: boolean;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
