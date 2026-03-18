import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
