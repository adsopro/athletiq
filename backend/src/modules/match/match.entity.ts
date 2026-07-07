import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Team } from '../team/team.entity';
import { Tournament } from '../tournament/tournament.entity';
import { TournamentPhase } from '../tournament-phase/tournament-phase.entity';
import { Group } from '../group/group.entity';
import { Participation } from '../participation/participation.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Equipo del club
   */
  @ManyToOne(() => Team, (team) => team.matches, {
    nullable: false,
  })
  team!: Team;

  /**
   * Torneo
   */
  @ManyToOne(() => Tournament, (tournament) => tournament.matches, {
    nullable: false,
  })
  tournament!: Tournament;

  /**
   * Fase
   */
  @ManyToOne(() => TournamentPhase, (phase) => phase.matches, {
    nullable: false,
  })
  phase!: TournamentPhase;

  /**
   * Grupo.
   * Es opcional porque una Final,
   * Semifinal o Repechaje
   * puede no pertenecer a un grupo.
   */
  @ManyToOne(() => Group, (group) => group.matches, {
    nullable: true,
  })
  group?: Group;

  /**
   * Fecha del campeonato
   */
  @Column()
  roundNumber!: number;

  /**
   * Nombre de la fecha
   */
  @Column({
    nullable: true,
    length: 80,
  })
  roundName?: string;

  /**
   * Rival
   */
  @Column({
    length: 150,
  })
  opponent!: string;

  /**
   * Fecha y hora
   */
  @Column({
    type: 'timestamp',
  })
  matchDate!: Date;

  /**
   * Cancha
   */
  @Column({
    nullable: true,
    length: 150,
  })
  venue?: string;

  /**
   * Ciudad
   */
  @Column({
    nullable: true,
    length: 100,
  })
  city?: string;

  /**
   * Local
   */
  @Column({
    default: false,
  })
  home!: boolean;

  /**
   * Oficial
   */
  @Column({
    default: true,
  })
  official!: boolean;

  /**
   * Marcador
   */
  @Column({
    default: 0,
  })
  goalsFor!: number;

  @Column({
    default: 0,
  })
  goalsAgainst!: number;

  /**
   * Estado
   */
  @Column({
    default: 'Scheduled',
    length: 20,
  })
  status!: string;

  /**
   * Importación automática
   */
  @Column({
    default: false,
  })
  importedAutomatically!: boolean;

  /**
   * URL oficial
   */
  @Column({
    nullable: true,
    length: 400,
  })
  officialUrl?: string;

  /**
   * Observaciones
   */
  @Column({
    nullable: true,
    type: 'text',
  })
  notes?: string;

  /**
   * Participaciones
   */
  @OneToMany(() => Participation, (participation) => participation.match)
  participations!: Participation[];
}
