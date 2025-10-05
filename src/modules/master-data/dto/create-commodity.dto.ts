import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCommodityDto {
  @ApiProperty()
  @IsString()
  commodity_name: string;

  @ApiProperty()
  @IsString()
  commodity_code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;
}


