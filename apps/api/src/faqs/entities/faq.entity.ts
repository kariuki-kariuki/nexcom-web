import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectIdType } from '../../@types/types';
import { Shop } from '../../shops/entities/shop.entity';

@Entity()
export class Faq {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(() => Shop, (shop) => shop.faqs, { cascade: true })
  shop: Shop;
}
