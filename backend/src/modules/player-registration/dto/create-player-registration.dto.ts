import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePlayerRegistrationDto {
  @IsInt()
  playerId!: number;

  @IsInt()
  teamId!: number;

  @IsInt()
  categoryId!: number;

  @IsInt()
  tournamentId!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  jerseyNumber?: number;

  @IsDateString()
  registrationDate!: string;

  @IsOptional()
  @IsDateString()
  withdrawalDate?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsBoolean()
  isReinforcement?: boolean;

  @IsOptional()
  @IsString()
  observations?: string;
}
