import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductSize } from '../../product_sizes/entities/product_size.entity';
import { Image } from '../../product_images/entities/image.entity';
import { ProductStatus } from '../../../@types/product-status';
import { ProjectIdType } from '../../../@types/types';
import { Analytic } from '../../../analytics/entity/analytic.entity';
import { Message } from '../../../chat/messages/entities/message.entity';
import { ProductComment } from '../../../product-comments/entities/product-comment.entity';
import { ProductVideo } from '../../../product-videos/entities/product-video.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { Category } from '../../categories/entities/category.entity';
import { Shop } from '../../entities/shop.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ default: ProductStatus.PUBLISHED })
  status: ProductStatus;

  @Column({ nullable: true })
  stock: number;

  @OneToMany(() => ProductSize, (productSize) => productSize.product, {
    cascade: true,
    eager: true,
  })
  product_sizes: ProductSize[];

  @OneToMany(() => Image, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images: Image[];

  // @OneToMany(() => Message, (message) => message.product)
  // messages: Message[];

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    eager: true,
  })
  category: Category;

  @OneToMany(() => Analytic, (analytic) => analytic.product, {
    cascade: true,
  })
  analytics: Analytic[];

  @OneToMany(() => Message, (message) => message.product)
  messages: Message;

  @ManyToOne(() => Shop, (shop) => shop.products, { eager: true })
  shop: Shop;

  @OneToMany(() => Cart, (cart) => cart.product)
  cartItems: Cart[];

  @OneToMany(() => ProductComment, (comment) => comment.product)
  comments: ProductComment[];

  @OneToMany(() => ProductVideo, (productVideo) => productVideo.product)
  videos: ProductVideo[];

  // Special columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
