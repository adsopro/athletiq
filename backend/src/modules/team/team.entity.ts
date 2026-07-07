import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

import { Club } from '../club/club.entity';
import { Category } from '../category/category.entity';
import { Match } from '../match/match.entity';
import { PlayerRegistration } from '../player-registration/player-registration.entity';

@Entity()
@Index(['club', 'category', 'season', 'letter'], { unique: true })
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Nombre visible
   * Leones Itagüí 2014A
   */
  @Column({ length: 120 })
  name!: string;

  /**
   * Club
   */
  @ManyToOne(() => Club, (club) => club.teams, {
    nullable: false,
  })
  club!: Club;

  /**
   * Categoría
   */
  @ManyToOne(() => Category, (category) => category.teams, {
    nullable: false,
  })
  category!: Category;

  /**
   * Temporada
   */
  @Column()
  season!: number;

  /**
   * Equipo A B C
   */
  @Column({
    length: 1,
    default: 'A',
  })
  letter!: string;

  /**
   * Masculino/Femenino
   */
  @Column({
    length: 1,
    default: 'M',
  })
  gender!: string;

  /**
   * Lugar de entrenamiento
   */
  @Column({
    nullable: true,
    length: 150,
  })
  trainingPlace?: string;

  /**
   * Días de entrenamiento
   * Lunes,Miércoles,Viernes
   */
  @Column({
    nullable: true,
    length: 120,
  })
  trainingDays?: string;

  /**
   * Hora entrenamiento
   */
  @Column({
    nullable: true,
    length: 40,
  })
  trainingTime?: string;

  /**
   * Color uniforme principal
   */
  @Column({
    nullable: true,
    length: 40,
  })
  primaryUniformColor?: string;

  /**
   * Color uniforme alterno
   */
  @Column({
    nullable: true,
    length: 40,
  })
  secondaryUniformColor?: string;

  /**
   * Observaciones
   */
  @Column({
    nullable: true,
    type: 'text',
  })
  notes?: string;

  /**
   * Estado
   */
  @Column({
    default: true,
  })
  active!: boolean;

  // ==========================
  // Relaciones
  // ==========================

  @OneToMany(() => PlayerRegistration, (registration) => registration.team)
  registrations!: PlayerRegistration[];

  @OneToMany(() => Match, (match) => match.team)
  matches!: Match[];
}
