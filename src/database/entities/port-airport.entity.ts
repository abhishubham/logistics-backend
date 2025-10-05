import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { City } from './city.entity';
import { PortOrAirportType } from './enums';

@Entity('ports_airports')
export class PortAirport {
  @PrimaryGeneratedColumn('increment')
  port_id: number;

  @Column({ unique: true })
  port_name: string;

  @Column({ unique: true })
  port_code: string;

  @Column({ type: 'enum', enum: PortOrAirportType })
  type: PortOrAirportType;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'city_id' })
  city: City;

  @Column()
  city_id: number;

  @Column({ default: true })
  is_active: boolean;
}


