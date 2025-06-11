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
import { User } from '../../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { ConversationType, ProjectIdType } from '../../../@types/types';
import { Image } from '../../../shops/product_images/entities/image.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column({ default: ConversationType.CONVERSATION })
  type: ConversationType;

  @Column({ nullable: true })
  name: string;

  @OneToOne(() => Image, { eager: true, cascade: true })
  @JoinColumn()
  profile: Image;

  @ManyToMany(() => User, (user) => user.conversations)
  users: User[];

  @ManyToOne(() => User, (user) => user.mygroups, { eager: true })
  creator: User;

  @ManyToMany(() => User, (user) => user.groupsAdmininstrating)
  @JoinTable()
  admins: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  // Special columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
