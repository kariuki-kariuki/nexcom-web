import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Exclude } from 'class-transformer';
import { ProjectIdType } from 'src/@types/types';
import { Cart } from 'src/shops/carts/entities/cart.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column()
  size: string;

  @Column({ default: 10 })
  price: number;

  @ManyToOne(() => Product, (product) => product.product_sizes, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @OneToMany(() => Cart, (cart) => cart.size)
  carts: Cart[];

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
