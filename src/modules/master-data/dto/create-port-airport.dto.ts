import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { PortOrAirportType } from '@/database/entities/enums';

export class CreatePortAirportDto {
  @ApiProperty()
  @IsString()
  port_name: string;

  @ApiProperty()
  @IsString()
  port_code: string;

  @ApiProperty({ enum: PortOrAirportType })
  @IsEnum(PortOrAirportType)
  type: PortOrAirportType;

  @ApiProperty()
  @IsInt()
  city_id: number;
}


