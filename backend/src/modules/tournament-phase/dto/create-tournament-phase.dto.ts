import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTournamentPhaseDto {
  /**
   * Torneo
   */
  @IsInt()
  tournamentId!: number;

  /**
   * Nombre
   * Ej:
   * Fase de grupos
   * Cuartos de final
   */
  @IsString()
  @MaxLength(120)
  name!: string;

  /**
   * Orden dentro del torneo
   */
  @IsInt()
  @Min(1)
  orderNumber!: number;

  /**
   * Tipo de fase
   *
   * GROUP_STAGE
   * ROUND_ROBIN
   * KNOCKOUT
   * FINAL
   * REPECHAGE
   */
  @IsString()
  @MaxLength(40)
  phaseType!: string;

  /**
   * Número de grupos
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  numberOfGroups?: number;

  /**
   * Equipos por grupo
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  teamsPerGroup?: number;

  /**
   * Clasificados por grupo
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  qualifiedTeamsPerGroup?: number;

  /**
   * Mejores terceros, etc.
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  additionalQualifiedTeams?: number;

  /**
   * Ida y vuelta
   */
  @IsOptional()
  @IsBoolean()
  homeAndAway?: boolean;

  /**
   * Permite empates
   */
  @IsOptional()
  @IsBoolean()
  allowDraws?: boolean;

  /**
   * Tiempo extra
   */
  @IsOptional()
  @IsBoolean()
  hasExtraTime?: boolean;

  /**
   * Penales
   */
  @IsOptional()
  @IsBoolean()
  hasPenaltyShootout?: boolean;

  /**
   * Permite refuerzos
   */
  @IsOptional()
  @IsBoolean()
  allowReinforcements?: boolean;

  /**
   * Cantidad máxima de refuerzos
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  maxReinforcements?: number;

  /**
   * Generación automática
   */
  @IsOptional()
  @IsBoolean()
  automaticGeneration?: boolean;

  /**
   * Depende de otra fase
   */
  @IsOptional()
  @IsInt()
  previousPhaseId?: number;

  /**
   * Inicio
   */
  @IsOptional()
  @IsDateString()
  startDate?: string;

  /**
   * Final
   */
  @IsOptional()
  @IsDateString()
  endDate?: string;

  /**
   * Activa
   */
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
