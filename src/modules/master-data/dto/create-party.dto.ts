import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartyType } from '@/database/entities/enums';

export class CreatePartyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  short_name?: string;

  @ApiProperty({ enum: PartyType })
  @IsEnum(PartyType)
  type: PartyType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  billing_address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  corporate_address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  credit_limit?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  credit_days?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  tds_rate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  tds_applicable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contact_person?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
}


