import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Conversation } from '../../chat/conversations/entities/Conversation.entity';
import { Message } from '../../chat/messages/entities/message.entity';
import { Shop } from '../../shops/entities/shop.entity';
import { Order } from '../../shops/orders/entities/order.entity';
import { ProjectIdType, UserRoles } from 'src/@types/types';
import { ProductComment } from 'src/product-comments/entities/product-comment.entity';
import { Image } from 'src/shops/product_images/entities/image.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @ApiProperty({
    example: 'Doe',
    description: 'provide the fistname of the user',
  })
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: false,
    default: 'Hey there, I am using Nexcom, The future of connected commerce.',
  })
  status: string;

  @Exclude()
  @Column({ default: UserRoles.USER })
  role: UserRoles;

  @Expose()
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Exclude()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Exclude()
  @Column({ nullable: true, type: 'text' })
  twoFAsecret: string;

  @Exclude()
  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Exclude()
  @Column({ unique: true })
  apiKey: string;

  @Column()
  @Exclude()
  phone: string;

  @OneToOne(() => Image, { eager: true, cascade: true })
  @JoinColumn()
  avatar: Image;

  /**
   * A user can create many playLists
   */

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  @JoinTable()
  conversations: Conversation[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => ProductComment, (comment) => comment.user)
  productComments: ProductComment[];

  @OneToOne(() => Shop, (shop) => shop.user)
  @JoinColumn()
  shop: Shop;

  @ManyToOne(() => Order, (order) => order.user)
  orders: Order[];

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
