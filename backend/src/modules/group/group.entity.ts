import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

import { TournamentPhase } from '../tournament-phase/tournament-phase.entity';
import { Match } from '../match/match.entity';

@Entity()
@Index(['phase', 'code'], { unique: true })
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Fase a la que pertenece.
   */
  @ManyToOne(() => TournamentPhase, (phase) => phase.groups, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  phase!: TournamentPhase;

  /**
   * Código del grupo.
   *
   * A
   * B
   * C
   */
  @Column({
    length: 5,
  })
  code!: string;

  /**
   * Nombre visible.
   *
   * Grupo A
   * Grupo B
   */
  @Column({
    length: 100,
  })
  name!: string;

  /**
   * Orden visual.
   */
  @Column({
    default: 1,
  })
  orderNumber!: number;

  /**
   * Número máximo de equipos.
   */
  @Column({
    default: 4,
  })
  maxTeams!: number;

  /**
   * Número de clasificados.
   */
  @Column({
    default: 2,
  })
  qualifiedTeams!: number;

  /**
   * Activo.
   */
  @Column({
    default: true,
  })
  active!: boolean;

  // =====================================
  // Relaciones
  // =====================================

  /**
   * Partidos del grupo.
   */
  @OneToMany(() => Match, (match) => match.group)
  matches!: Match[];
}
