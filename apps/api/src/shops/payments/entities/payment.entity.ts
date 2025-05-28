import { Exclude } from 'class-transformer';
import { PaymentStatus, ProjectIdType } from 'src/@types/types';
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

  @Exclude()
  @Column()
  merchantRequestId: string;

  @Exclude()
  @Column()
  checkoutRequestId: string;

  @Exclude()
  @Column()
  resultCode: number;

  @Exclude()
  @Column()
  resultDesc: string;

  @Column()
  amount: number;

  @Exclude()
  @Column()
  mpesaReceiptNumber: string;

  @Column()
  transactionDate: Date;

  @Column()
  @Exclude()
  phoneNumber: string;

  @Column({ default: PaymentStatus.PENDING }) // pending, success, failed
  status: PaymentStatus;

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
