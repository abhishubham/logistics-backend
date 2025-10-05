import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PartyType } from './enums';

@Entity('parties')
export class Party {
  @PrimaryGeneratedColumn('increment')
  party_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  short_name: string;

  @Column({ type: 'enum', enum: PartyType })
  type: PartyType;

  @Column({ nullable: true })
  billing_address: string;

  @Column({ nullable: true })
  corporate_address: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  credit_limit: string;

  @Column({ type: 'int', default: 0 })
  credit_days: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  tds_rate: string;

  @Column({ default: false })
  tds_applicable: boolean;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ default: true })
  is_active: boolean;
}


