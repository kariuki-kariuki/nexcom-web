import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JobState } from '../../@types/jobs';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

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

  @Column({ nullable: true })
  jd: string;

  @Column({ type: 'enum', enum: JobState, default: JobState.Published })
  status: JobState;
}
