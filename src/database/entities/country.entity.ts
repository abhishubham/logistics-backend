import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('increment')
  country_id: number;

  @Column({ unique: true })
  country_name: string;

  @Column({ unique: true, length: 3 })
  country_code: string;

  @Column({ nullable: true })
  capital: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  language: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}


