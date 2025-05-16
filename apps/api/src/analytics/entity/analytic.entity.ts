import { Exclude } from 'class-transformer';
import { Product } from 'src/shops/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Analytic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.analytics, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Exclude()
  @Column({ nullable: true })
  browser: string;

  @Exclude()
  @Column({ nullable: true })
  os: string;

  @Exclude()
  @Column({ nullable: true })
  platform: string;

  @Exclude()
  @Column({ default: false })
  isMobile: boolean;

  @Exclude()
  @Column({ default: false })
  isDesktop: boolean;

  @Exclude()
  @Column({ default: false })
  isTablet: boolean;

  @Exclude()
  @Column({ default: '1.0.0' })
  version: string;

  @CreateDateColumn()
  created_at: Date;
}
