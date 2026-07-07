import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MaxLength,
  IsNumber,
  Max,
} from 'class-validator';

export class CreateParticipationDto {
  /**
   * Inscripción del jugador en el torneo
   */
  @IsInt()
  playerRegistrationId!: number;

  /**
   * Partido
   */
  @IsInt()
  matchId!: number;

  /**
   * ¿Actuó como refuerzo?
   */
  @IsOptional()
  @IsBoolean()
  isReinforcement?: boolean;

  /**
   * Posición utilizada
   */
  @IsOptional()
  @IsString()
  @MaxLength(30)
  positionPlayed?: string;

  /**
   * Número de camiseta utilizado
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  jerseyNumber?: number;

  /**
   * Minutos disputados
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  minutesPlayed?: number;

  // ==========================
  // Estadísticas ofensivas
  // ==========================

  @IsOptional()
  @IsInt()
  @Min(0)
  goals?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  assists?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  shots?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  shotsOnTarget?: number;

  // ==========================
  // Construcción
  // ==========================

  @IsOptional()
  @IsInt()
  @Min(0)
  passesCompleted?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  keyPasses?: number;

  // ==========================
  // Defensa
  // ==========================

  @IsOptional()
  @IsInt()
  @Min(0)
  tackles?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  interceptions?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  recoveries?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  clearances?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  blocks?: number;

  // ==========================
  // Portero
  // ==========================

  @IsOptional()
  @IsInt()
  @Min(0)
  saves?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  goalsConceded?: number;

  // ==========================
  // Disciplina
  // ==========================

  @IsOptional()
  @IsInt()
  @Min(0)
  yellowCards?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  redCards?: number;

  // ==========================
  // Reconocimientos
  // ==========================

  @IsOptional()
  @IsBoolean()
  playerOfTheMatch?: boolean;

  /**
   * Calificación del entrenador (1 a 10)
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  coachRating?: number;

  /**
   * Observaciones
   */
  @IsOptional()
  @IsString()
  notes?: string;
}
