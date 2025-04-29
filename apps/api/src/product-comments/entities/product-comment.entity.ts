import { ProjectIdType } from 'src/@types/types';
import { Product } from 'src/shops/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

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
