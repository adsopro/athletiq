import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

import { Tournament } from '../tournament/tournament.entity';
import { Match } from '../match/match.entity';
import { Group } from '../group/group.entity';

@Entity()
@Index(['tournament', 'orderNumber'], { unique: true })
export class TournamentPhase {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Torneo al que pertenece.
   */
  @ManyToOne(() => Tournament, (tournament) => tournament.phases, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  tournament!: Tournament;

  /**
   * Nombre visible.
   *
   * Ej:
   * Fase de grupos
   * Cuartos
   * Semifinal
   * Final
   * Repechaje
   */
  @Column({
    length: 120,
  })
  name!: string;

  /**
   * Orden dentro del torneo.
   *
   * 1
   * 2
   * 3
   */
  @Column()
  orderNumber!: number;

  /**
   * Tipo.
   *
   * GROUP_STAGE
   * ROUND_ROBIN
   * KNOCKOUT
   * REPECHAGE
   * FINAL
   */
  @Column({
    length: 40,
  })
  phaseType!: string;

  /**
   * Número de grupos.
   *
   * Liga Antioqueña:
   * 3 grupos
   *
   * Final:
   * 0 grupos
   */
  @Column({
    default: 1,
  })
  numberOfGroups!: number;

  /**
   * Equipos por grupo.
   */
  @Column({
    default: 0,
  })
  teamsPerGroup!: number;

  /**
   * Clasificados por grupo.
   */
  @Column({
    default: 0,
  })
  qualifiedTeamsPerGroup!: number;

  /**
   * Clasificados adicionales.
   *
   * Mejores terceros, etc.
   */
  @Column({
    default: 0,
  })
  additionalQualifiedTeams!: number;

  /**
   * Ida y vuelta.
   */
  @Column({
    default: false,
  })
  homeAndAway!: boolean;

  /**
   * Permite empates.
   */
  @Column({
    default: true,
  })
  allowDraws!: boolean;

  /**
   * Tiempo extra.
   */
  @Column({
    default: false,
  })
  hasExtraTime!: boolean;

  /**
   * Penales.
   */
  @Column({
    default: false,
  })
  hasPenaltyShootout!: boolean;

  /**
   * Permite refuerzos.
   */
  @Column({
    default: false,
  })
  allowReinforcements!: boolean;

  /**
   * Máximo número de refuerzos.
   */
  @Column({
    default: 0,
  })
  maxReinforcements!: number;

  /**
   * La fase se genera automáticamente.
   */
  @Column({
    default: true,
  })
  automaticGeneration!: boolean;

  /**
   * Depende de una fase anterior.
   */
  @ManyToOne(() => TournamentPhase, {
    nullable: true,
  })
  previousPhase?: TournamentPhase;

  /**
   * Fecha de inicio.
   */
  @Column({
    type: 'date',
    nullable: true,
  })
  startDate?: Date;

  /**
   * Fecha final.
   */
  @Column({
    type: 'date',
    nullable: true,
  })
  endDate?: Date;

  /**
   * Activa.
   */
  @Column({
    default: true,
  })
  active!: boolean;

  // ============================================================
  // Relaciones
  // ============================================================

  /**
   * Grupos pertenecientes a la fase.
   */
  @OneToMany(() => Group, (group) => group.phase)
  groups!: Group[];

  /**
   * Partidos.
   *
   * Algunas fases (como una Final)
   * pueden no tener grupos.
   */
  @OneToMany(() => Match, (match) => match.phase)
  matches!: Match[];
}
