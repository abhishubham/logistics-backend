import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('increment')
  city_id: number;

  @Column({ unique: true })
  city_name: string;

  @Column({ unique: true })
  city_code: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'country_id' })
  country: Country;

  @Column()
  country_id: number;

  @Column({ default: true })
  is_active: boolean;
}


