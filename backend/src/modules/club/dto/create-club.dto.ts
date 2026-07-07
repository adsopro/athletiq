import {
  IsString,
  IsOptional,
  IsUrl,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateClubDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  shortName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;
}
