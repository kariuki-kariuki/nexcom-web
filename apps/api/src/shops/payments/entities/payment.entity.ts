import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectIdType, PaymentStatus } from '../../../@types/types';
import { Order } from '../../orders/entities/order.entity';

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
  @Column({ type: 'int' }) // Explicitly define type for better database consistency
  resultCode: number;

  @Exclude()
  @Column()
  resultDesc: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Use decimal for monetary values
  amount: number;

  @Exclude()
  @Column()
  mpesaReceiptNumber: string;

  @Column({ type: 'timestamp' }) // Ensure proper date handling
  transactionDate: Date;

  @Column()
  @Exclude()
  phoneNumber: string;

  @Column({ default: PaymentStatus.PENDING, enum: PaymentStatus }) // Use enum for type safety
  status: PaymentStatus;

  @Column({ nullable: true })
  failureReason: string | null; // Explicitly allow null

  @Column({ default: false })
  verified: boolean;

  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'CASCADE' }) // Add cascading delete
  order: Order;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
