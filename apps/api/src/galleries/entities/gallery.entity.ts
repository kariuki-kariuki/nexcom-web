import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from 'src/shops/product_images/entities/image.entity';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Image, (image) => image.gallery)
  images: Image[];
}
