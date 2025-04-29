import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResourceFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
