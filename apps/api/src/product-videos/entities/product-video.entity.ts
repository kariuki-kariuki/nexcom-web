import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectIdType } from '../../@types/types';
import { Product } from '../../shops/products/entities/product.entity';

@Entity()
export class ProductVideo {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column({ nullable: true })
  name: string;

  //
  signedUrl: string;
  @Column()
  url: string;

  @Column()
  description: string;

  @ManyToOne(() => Product, (product) => product.videos)
  product: Product;

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
