import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGroupDto {
  @IsInt()
  phaseId!: number;

  @IsString()
  @MaxLength(5)
  code!: string;

  @IsString()
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  orderNumber?: number;

  @IsOptional()
  @IsInt()
  @Min(2)
  maxTeams?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  qualifiedTeams?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
