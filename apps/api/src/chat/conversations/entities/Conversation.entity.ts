import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { ProjectIdType } from '../../../@types/types';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @ManyToMany(() => User, (user) => user.conversations)
  users: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  // Special columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
