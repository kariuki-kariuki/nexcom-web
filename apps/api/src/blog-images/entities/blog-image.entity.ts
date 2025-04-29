import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity()
export class BlogImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  altText: string;

  @ManyToOne(() => Blog, (blog) => blog.images, {
    onDelete: 'CASCADE',
  })
  blog: Blog;

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
