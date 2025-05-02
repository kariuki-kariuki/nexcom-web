import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from '../../conversations/entities/Conversation.entity';
import { User } from '../../../users/entities/user.entity';
import { MessageState } from 'src/@types/chat/chat';
import { ProjectIdType } from 'src/@types/types';
import { Product } from 'src/shops/products/entities/product.entity';
import { Image } from 'src/shops/product_images/entities/image.entity';
// import { Product } from 'src/shops/products/entities/product.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column({ type: 'text', nullable: true })
  message: string;

  @OneToMany(() => Image, (image) => image.message, { eager: true })
  files: Image[];

  @Column({ type: 'enum', enum: MessageState, default: MessageState.SENT })
  state: MessageState;

  // product
  @Column({ nullable: true })
  productId: ProjectIdType;

  @ManyToOne(() => Product, (product) => product.messages)
  product: Product;

  // Relations
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
  // Special columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
