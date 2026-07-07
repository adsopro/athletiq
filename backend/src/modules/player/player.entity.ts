import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';

import { PlayerRegistration } from '../player-registration/player-registration.entity';

@Entity()
@Index(['documentNumber'], { unique: true })
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Nombre completo
   */
  @Column({
    length: 150,
  })
  fullName!: string;

  /**
   * Fecha de nacimiento
   */
  @Column({
    type: 'date',
  })
  birthDate!: Date;

  /**
   * Documento de identidad
   */
  @Column({
    nullable: true,
    unique: true,
    length: 30,
  })
  documentNumber?: string;

  /**
   * Número interno del club
   * (No corresponde al número de camiseta)
   */
  @Column({
    nullable: true,
  })
  internalCode?: number;

  /**
   * Posición principal
   */
  @Column({
    nullable: true,
    length: 30,
  })
  position?: string;

  /**
   * Perfil dominante
   * Derecho
   * Izquierdo
   * Ambos
   */
  @Column({
    nullable: true,
    length: 15,
  })
  dominantFoot?: string;

  /**
   * Estatura (cm)
   */
  @Column({
    nullable: true,
  })
  height?: number;

  /**
   * Peso (kg)
   */
  @Column({
    nullable: true,
  })
  weight?: number;

  /**
   * Fotografía
   */
  @Column({
    nullable: true,
    length: 300,
  })
  photoUrl?: string;

  /**
   * Teléfono
   */
  @Column({
    nullable: true,
    length: 30,
  })
  phone?: string;

  /**
   * Correo
   */
  @Column({
    nullable: true,
    length: 120,
  })
  email?: string;

  /**
   * EPS
   */
  @Column({
    nullable: true,
    length: 120,
  })
  healthInsurance?: string;

  /**
   * Observaciones médicas
   */
  @Column({
    nullable: true,
    type: 'text',
  })
  medicalNotes?: string;

  /**
   * Jugador activo
   */
  @Column({
    default: true,
  })
  active!: boolean;

  /**
   * Historial de inscripciones
   * Un jugador puede estar inscrito
   * en varios torneos,
   * categorías o temporadas.
   */
  @OneToMany(() => PlayerRegistration, (registration) => registration.player)
  registrations!: PlayerRegistration[];
}
