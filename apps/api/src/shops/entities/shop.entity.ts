import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Image } from '../product_images/entities/image.entity';
import { ProjectIdType } from '../../@types/types';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: false })
  verified: boolean;

  @ManyToOne(() => Category, (category) => category.shops, { eager: true })
  category: Category;

  @OneToOne(() => User, (user) => user.shop)
  user: User;

  @OneToOne(() => Image, { cascade: true, eager: true })
  @JoinColumn()
  bannerImage: Image;

  @OneToMany(() => Product, (product) => product.shop, { onDelete: 'CASCADE' })
  products: Product[];
}
