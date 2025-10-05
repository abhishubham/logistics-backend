import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('commodities')
export class Commodity {
  @PrimaryGeneratedColumn('increment')
  commodity_id: number;

  @Column({ unique: true })
  commodity_name: string;

  @Column({ unique: true })
  commodity_code: string;

  @Column({ nullable: true })
  category: string; // e.g. agriculture/chemicals/etc

  @Column({ default: true })
  is_active: boolean;
}


