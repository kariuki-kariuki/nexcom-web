import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobState } from '../../@types/jobs';
import { ProjectIdType } from '../../@types/types';
import { Image } from '../../shops/product_images/entities/image.entity';
import { Shop } from '../../shops/entities/shop.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: ProjectIdType;

  @Column()
  title: string;

  @ManyToOne(() => Shop, (shop) => shop.jobs)
  shop: Shop;

  @Column()
  description: string;

  @Column('text', { array: true, default: [], nullable: false })
  requirements: string[];

  @Column()
  deadline: Date;

  @Column()
  location: string;

  @Column()
  type: string;

  @OneToOne(() => Image, { eager: true, cascade: true })
  @JoinColumn()
  jd: Image;

  @Column({ type: 'enum', enum: JobState, default: JobState.Published })
  status: JobState;
}
