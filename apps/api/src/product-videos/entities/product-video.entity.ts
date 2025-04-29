import { Exclude } from 'class-transformer';
import { ProjectIdType } from 'src/@types/types';
import { Product } from 'src/shops/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
