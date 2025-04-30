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

  @ManyToOne(() => Product, (product) => product.analytics)
  product: Product;

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  platform: string;

  @Column({ default: false })
  isMobile: boolean;

  @Column({ default: false })
  isDesktop: boolean;

  @Column({ default: false })
  isTablet: boolean;

  @Column({ default: '1.0.0' })
  version: string;

  @CreateDateColumn()
  created_at: Date;
}
