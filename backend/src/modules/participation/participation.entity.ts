import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Match } from '../match/match.entity';
import { PlayerRegistration } from '../player-registration/player-registration.entity';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Inscripción del jugador en el torneo.
   * Desde aquí conocemos automáticamente:
   * - Jugador
   * - Equipo
   * - Categoría
   * - Torneo
   */
  @ManyToOne(
    () => PlayerRegistration,
    (registration) => registration.participations,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  playerRegistration!: PlayerRegistration;

  /**
   * Partido disputado
   */
  @ManyToOne(() => Match, (match) => match.participations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  match!: Match;

  /**
   * ¿Jugó como refuerzo?
   * (Puede calcularse automáticamente,
   * pero se almacena para auditoría.)
   */
  @Column({
    default: false,
  })
  isReinforcement!: boolean;

  /**
   * Posición utilizada ese día
   */
  @Column({
    nullable: true,
    length: 30,
  })
  positionPlayed?: string;

  /**
   * Número de camiseta usado en ese partido.
   * Puede variar entre torneos.
   */
  @Column({
    nullable: true,
  })
  jerseyNumber?: number;

  /**
   * Minutos jugados
   */
  @Column({
    default: 0,
  })
  minutesPlayed!: number;

  // ===========================
  // Estadísticas ofensivas
  // ===========================

  @Column({ default: 0 })
  goals!: number;

  @Column({ default: 0 })
  assists!: number;

  @Column({ default: 0 })
  shots!: number;

  @Column({ default: 0 })
  shotsOnTarget!: number;

  // ===========================
  // Construcción
  // ===========================

  @Column({ default: 0 })
  passesCompleted!: number;

  @Column({ default: 0 })
  keyPasses!: number;

  // ===========================
  // Defensa
  // ===========================

  @Column({ default: 0 })
  tackles!: number;

  @Column({ default: 0 })
  interceptions!: number;

  @Column({ default: 0 })
  recoveries!: number;

  @Column({ default: 0 })
  clearances!: number;

  @Column({ default: 0 })
  blocks!: number;

  // ===========================
  // Portero
  // ===========================

  @Column({ default: 0 })
  saves!: number;

  @Column({ default: 0 })
  goalsConceded!: number;

  // ===========================
  // Disciplina
  // ===========================

  @Column({ default: 0 })
  yellowCards!: number;

  @Column({ default: 0 })
  redCards!: number;

  @Column({
    default: false,
  })
  playerOfTheMatch!: boolean;

  /**
   * Calificación del entrenador
   * Escala 1-10
   */
  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    nullable: true,
  })
  coachRating?: number;

  /**
   * Observaciones
   */
  @Column({
    nullable: true,
    type: 'text',
  })
  notes?: string;
}
