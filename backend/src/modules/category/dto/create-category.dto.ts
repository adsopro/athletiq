import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(20)
  displayName!: string;

  @IsInt()
  referenceYear!: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  alias?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsInt()
  clubId!: number;
}
