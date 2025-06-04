import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { ProjectIdType } from '../../@types/types';
import { Product } from '../../shops/products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
@Tree('closure-table')
export class ProductComment {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.productComments)
  user: User;

  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;

  @TreeParent()
  parent: ProductComment;

  @TreeChildren()
  children: ProductComment[];
}
