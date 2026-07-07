import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Player } from '../player/player.entity';
import { Team } from '../team/team.entity';
import { Tournament } from '../tournament/tournament.entity';
import { Category } from '../category/category.entity';
import { Participation } from '../participation/participation.entity';

@Entity()
export class PlayerRegistration {
  @PrimaryGeneratedColumn()
  id!: number;

  // Jugador inscrito
  @ManyToOne(() => Player, (player) => player.registrations)
  player!: Player;

  // Equipo donde quedó inscrito
  @ManyToOne(() => Team, (team) => team.registrations)
  team!: Team;

  // Categoría donde quedó inscrito
  @ManyToOne(() => Category, (category) => category.registrations)
  category!: Category;

  // Torneo
  @ManyToOne(() => Tournament, (tournament) => tournament.registrations)
  tournament!: Tournament;

  @Column({ nullable: true })
  jerseyNumber?: number;

  @Column({ type: 'date' })
  registrationDate!: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  withdrawalDate?: Date;

  @Column({
    default: true,
  })
  active!: boolean;

  @Column({
    default: false,
  })
  isReinforcement!: boolean;

  @Column({
    nullable: true,
    type: 'text',
  })
  observations?: string;

  @OneToMany(
    () => Participation,
    (participation) => participation.playerRegistration,
  )
  participations!: Participation[];
}
