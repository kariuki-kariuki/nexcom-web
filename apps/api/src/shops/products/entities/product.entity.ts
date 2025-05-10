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
import { Shop } from 'src/shops/entities/shop.entity';
import { Category } from 'src/shops/categories/entities/category.entity';
import { ProjectIdType } from 'src/@types/types';
import { Message } from 'src/chat/messages/entities/message.entity';
import { Cart } from 'src/shops/carts/entities/cart.entity';
import { ProductVideo } from 'src/product-videos/entities/product-video.entity';
import { ProductComment } from 'src/product-comments/entities/product-comment.entity';
import { Analytic } from 'src/analytics/entity/analytic.entity';
// import { Message } from 'src/chat/messages/entities/message.entity';

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

  @OneToMany(() => Analytic, (analytic) => analytic.product)
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
