import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ProjectIdType } from 'src/@types/types';
import { Shop } from 'src/shops/entities/shop.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];

  @OneToMany(() => Shop, (shop) => shop.category)
  shops: Shop[];
}
