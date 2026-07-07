import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMatchDto {
  /**
   * Equipo del club
   */
  @IsInt()
  teamId!: number;

  /**
   * Torneo
   */
  @IsInt()
  tournamentId!: number;

  /**
   * Fase del torneo
   */
  @IsInt()
  phaseId!: number;

  @IsOptional()
  @IsInt()
  groupId?: number;

  /**
   * Número de la fecha
   */
  @IsInt()
  @Min(1)
  roundNumber!: number;

  /**
   * Nombre de la fecha
   */
  @IsOptional()
  @IsString()
  @MaxLength(80)
  roundName?: string;

  /**
   * Rival
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  opponent!: string;

  /**
   * Fecha y hora
   */
  @IsDateString()
  matchDate!: string;

  /**
   * Local o visitante
   */
  @IsOptional()
  @IsBoolean()
  home?: boolean;

  /**
   * Marcador
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  goalsFor?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  goalsAgainst?: number;

  /**
   * Cancha
   */
  @IsOptional()
  @IsString()
  @MaxLength(150)
  venue?: string;

  /**
   * Ciudad
   */
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  /**
   * Partido oficial
   */
  @IsOptional()
  @IsBoolean()
  official?: boolean;

  /**
   * Estado
   */
  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  /**
   * Importado automáticamente
   */
  @IsOptional()
  @IsBoolean()
  importedAutomatically?: boolean;

  /**
   * URL oficial
   */
  @IsOptional()
  @IsString()
  @MaxLength(400)
  officialUrl?: string;

  /**
   * Observaciones
   */
  @IsOptional()
  @IsString()
  notes?: string;
}
