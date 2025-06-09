import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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
import { ProjectIdType, UserRoles } from '../../@types/types';
import { ProductComment } from '../../product-comments/entities/product-comment.entity';
import { Cart } from '../../shops/carts/entities/cart.entity';
import { Image } from '../../shops/product_images/entities/image.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @ApiProperty({
    example: 'Doe',
    description: 'provide the fistname of the user',
  })
  @Exclude()
  @Column()
  firstName: string;

  @Exclude()
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

  @Column({ type: 'date', default: new Date() })
  lastSeen: Date;

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

  @OneToMany(() => Conversation, (group) => group.creator)
  mygroups: Conversation[];

  @ManyToMany(() => Conversation, (group) => group.admins)
  groupsAdmininstrating: Conversation[];

  @OneToMany(() => ProductComment, (comment) => comment.user)
  productComments: ProductComment[];

  @OneToOne(() => Shop, (shop) => shop.user)
  @JoinColumn()
  shop: Shop;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cartItems: Cart[];

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
