import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Exclude } from 'class-transformer';
import { ProjectIdType } from '../../../@types/types';
import { Message } from '../../../chat/messages/entities/message.entity';
import { Gallery } from '../../../galleries/entities/gallery.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column({ nullable: true })
  name: string;

  @Column()
  url: string;

  signedUrl: string;

  @Column({ nullable: true })
  altText: string;

  @Column({ default: 'image/png' })
  mimeType: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Gallery, (gallery) => gallery.images, {
    onDelete: 'CASCADE',
  })
  gallery: Gallery;

  @ManyToOne(() => Message, (message) => message.files, {
    onDelete: 'CASCADE',
  })
  message: Message;

  // Special columns
  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
