import {
  BeforeInsert,
  BeforeUpdate,
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
import { BadRequestException } from '@nestjs/common';

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

  @Column('text', { nullable: false, array: true, default: ['Latest'] })
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

  // Validation
  @BeforeInsert()
  @BeforeUpdate()
  validateTags() {
    // Optional: trim & lowercase
    this.tags = this.tags.map((t) => t.trim().toLowerCase()).filter(Boolean);
    if (this.tags.length === 0) {
      throw new BadRequestException('Blog must have at least one valid tag.');
    }
  }
}
