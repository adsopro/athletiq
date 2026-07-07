import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';

import { Match } from '../match/match.entity';
import { TournamentPhase } from '../tournament-phase/tournament-phase.entity';
import { PlayerRegistration } from '../player-registration/player-registration.entity';

@Entity()
@Index(['name', 'season'], { unique: true })
export class Tournament {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Nombre
   * Liga Antioqueña
   * Baby Fútbol
   * Indesa
   */
  @Column({
    length: 150,
  })
  name!: string;

  /**
   * Temporada
   */
  @Column({
    length: 20,
  })
  season!: string;

  /**
   * Organizador
   */
  @Column({
    nullable: true,
    length: 150,
  })
  organizer?: string;

  /**
   * País
   */
  @Column({
    nullable: true,
    length: 80,
  })
  country?: string;

  /**
   * Ciudad principal
   */
  @Column({
    nullable: true,
    length: 80,
  })
  city?: string;

  /**
   * Página oficial
   */
  @Column({
    nullable: true,
    length: 300,
  })
  website?: string;

  /**
   * Logo
   */
  @Column({
    nullable: true,
    length: 300,
  })
  logoUrl?: string;

  /**
   * Permite ascender categorías
   */
  @Column({
    default: false,
  })
  allowCategoryPromotion!: boolean;

  @Column({
    default: 0,
  })
  maxPromotionLevels!: number;

  /**
   * Permite refuerzos
   */
  @Column({
    default: false,
  })
  allowReinforcements!: boolean;

  @Column({
    default: 0,
  })
  maxReinforcements!: number;

  /**
   * Permite doble jornada
   */
  @Column({
    default: false,
  })
  allowSameDayMatches!: boolean;

  /**
   * Configuración del partido
   */
  @Column({
    default: 11,
  })
  playersOnField!: number;

  @Column({
    default: 7,
  })
  substitutesAllowed!: number;

  @Column({
    default: 5,
  })
  maxSubstitutions!: number;

  @Column({
    default: false,
  })
  unlimitedSubstitutions!: boolean;

  @Column({
    default: 2,
  })
  periods!: number;

  @Column({
    default: 35,
  })
  minutesPerPeriod!: number;

  /**
   * Competencia
   */
  @Column({
    default: true,
  })
  hasGroupStage!: boolean;

  @Column({
    default: true,
  })
  hasKnockoutStage!: boolean;

  @Column({
    default: false,
  })
  homeAndAway!: boolean;

  /**
   * Integraciones
   */
  @Column({
    default: false,
  })
  supportsAutomaticImport!: boolean;

  @Column({
    default: false,
  })
  supportsVideoAnalysis!: boolean;

  /**
   * Estado
   */
  @Column({
    default: true,
  })
  active!: boolean;

  // ===========================
  // Relaciones
  // ===========================

  @OneToMany(() => TournamentPhase, (phase) => phase.tournament)
  phases!: TournamentPhase[];

  @OneToMany(() => Match, (match) => match.tournament)
  matches!: Match[];

  @OneToMany(
    () => PlayerRegistration,
    (registration) => registration.tournament,
  )
  registrations!: PlayerRegistration[];
}
