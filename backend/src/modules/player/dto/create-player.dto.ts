import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @MaxLength(150)
  fullName!: string;

  @IsDateString()
  birthDate!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  documentNumber?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  internalCode?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  position?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  dominantFoot?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  height?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  healthInsurance?: string;

  @IsOptional()
  @IsString()
  medicalNotes?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
