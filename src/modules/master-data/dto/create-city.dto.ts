import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty()
  @IsString()
  city_name: string;

  @ApiProperty()
  @IsString()
  city_code: string;

  @ApiProperty()
  @IsInt()
  country_id: number;
}


