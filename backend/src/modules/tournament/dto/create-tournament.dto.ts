import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  @MaxLength(150)
  name!: string;

  @IsString()
  @MaxLength(20)
  season!: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  organizer?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsBoolean()
  allowCategoryPromotion?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxPromotionLevels?: number;

  @IsOptional()
  @IsBoolean()
  allowReinforcements?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxReinforcements?: number;

  @IsOptional()
  @IsBoolean()
  allowSameDayMatches?: boolean;

  @IsOptional()
  @IsInt()
  playersOnField?: number;

  @IsOptional()
  @IsInt()
  substitutesAllowed?: number;

  @IsOptional()
  @IsInt()
  maxSubstitutions?: number;

  @IsOptional()
  @IsBoolean()
  unlimitedSubstitutions?: boolean;

  @IsOptional()
  @IsInt()
  periods?: number;

  @IsOptional()
  @IsInt()
  minutesPerPeriod?: number;

  @IsOptional()
  @IsBoolean()
  hasGroupStage?: boolean;

  @IsOptional()
  @IsBoolean()
  hasKnockoutStage?: boolean;

  @IsOptional()
  @IsBoolean()
  homeAndAway?: boolean;

  @IsOptional()
  @IsBoolean()
  supportsAutomaticImport?: boolean;

  @IsOptional()
  @IsBoolean()
  supportsVideoAnalysis?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
