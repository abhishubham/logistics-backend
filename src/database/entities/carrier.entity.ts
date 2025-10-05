import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CarrierType } from './enums';

@Entity('carriers')
export class Carrier {
  @PrimaryGeneratedColumn('increment')
  carrier_id: number;

  @Column({ unique: true })
  carrier_name: string;

  @Column({ unique: true })
  carrier_code: string;

  @Column({ type: 'enum', enum: CarrierType })
  type: CarrierType;

  @Column({ default: true })
  is_active: boolean;
}


