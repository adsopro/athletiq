import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Category } from '../category/category.entity';
import { Team } from '../team/team.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  shortName!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ nullable: true })
  logoUrl!: string;

  @OneToMany(() => Category, (category) => category.club)
  categories!: Category[];

  @OneToMany(() => Team, (team) => team.club)
  teams!: Team[];
}
