import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CarrierType } from '@/database/entities/enums';

export class CreateCarrierDto {
  @ApiProperty()
  @IsString()
  carrier_name: string;

  @ApiProperty()
  @IsString()
  carrier_code: string;

  @ApiProperty({ enum: CarrierType })
  @IsEnum(CarrierType)
  type: CarrierType;
}


