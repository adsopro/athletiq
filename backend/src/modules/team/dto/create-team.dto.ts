import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  IsNotEmpty,
  MaxLength,
  IsIn,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name!: string;

  @IsInt()
  clubId!: number;

  @IsInt()
  categoryId!: number;

  @IsInt()
  season!: number;

  @IsOptional()
  @IsString()
  @IsIn(['A', 'B', 'C'])
  letter?: string;

  @IsOptional()
  @IsString()
  @IsIn(['M', 'F'])
  gender?: string;

  @IsOptional()
  @IsString()
  trainingPlace?: string;

  @IsOptional()
  @IsString()
  trainingDays?: string;

  @IsOptional()
  @IsString()
  trainingTime?: string;

  @IsOptional()
  @IsString()
  primaryUniformColor?: string;

  @IsOptional()
  @IsString()
  secondaryUniformColor?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
