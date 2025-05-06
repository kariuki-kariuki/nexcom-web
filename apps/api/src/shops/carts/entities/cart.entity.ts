import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../../users/entities/user.entity';
import { ProjectIdType } from 'src/@types/types';
import { Order } from 'src/shops/orders/entities/order.entity';
import { ProductSize } from 'src/shops/product_sizes/entities/product_size.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  customer_description: string;

  @ManyToOne(() => Product, (product) => product.cartItems, { eager: true })
  product: Product;

  @ManyToOne(() => ProductSize, (productSize) => productSize.carts, {
    eager: true,
  })
  size: ProductSize;

  @ManyToOne(() => Order, (order) => order.cartItems)
  orders: Order[];

  @Column({ default: false })
  ordered: boolean;

  @ManyToOne(() => User, (user) => user.cartItems, { eager: true })
  user: User;

  // Special columns
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
