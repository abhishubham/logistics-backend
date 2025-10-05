import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty()
  @IsString()
  country_name: string;

  @ApiProperty({ maxLength: 3 })
  @IsString()
  @Length(2, 3)
  country_code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  capital?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  language?: string;
}


