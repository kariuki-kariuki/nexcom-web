import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../shops/product_images/entities/image.entity';
import { User } from '../../users/entities/user.entity';

export type BlogStatus = 'Published' | 'Draft' | 'Archive';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false, type: 'simple-array' })
  tags: string[];

  @Column({ default: 'Draft' })
  status: BlogStatus;

  @OneToOne(() => Image, { cascade: true, eager: true })
  @JoinColumn()
  featuredImage: Image;

  @ManyToOne(() => User, { cascade: true, eager: true })
  author: User;

  // Special columns
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
