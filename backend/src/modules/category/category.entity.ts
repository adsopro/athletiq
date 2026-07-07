import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

import { Club } from '../club/club.entity';
import { Team } from '../team/team.entity';
import { PlayerRegistration } from '../player-registration/player-registration.entity';

@Entity()
@Index(['club', 'referenceYear'], { unique: true })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Nombre visible
   * Ej:
   * 2014
   */
  @Column({
    length: 20,
  })
  displayName!: string;

  /**
   * Año de referencia
   * Ej:
   * 2014
   */
  @Column()
  referenceYear!: number;

  /**
   * Alias
   * Ej:
   * Sub-12
   */
  @Column({
    nullable: true,
    length: 30,
  })
  alias?: string;

  /**
   * Descripción
   */
  @Column({
    nullable: true,
    type: 'text',
  })
  description?: string;

  /**
   * Activa
   */
  @Column({
    default: true,
  })
  active!: boolean;

  /**
   * Club propietario
   */
  @ManyToOne(() => Club, (club) => club.categories, {
    nullable: false,
  })
  club!: Club;

  /**
   * Equipos de esta categoría
   */
  @OneToMany(() => Team, (team) => team.category)
  teams!: Team[];

  /**
   * Inscripciones realizadas en esta categoría
   */
  @OneToMany(() => PlayerRegistration, (registration) => registration.category)
  registrations!: PlayerRegistration[];
}
