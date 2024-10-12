import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column({ default: false })
  is_sme: boolean;

  @Column({ nullable: true })
  additional_text: string;

  @Column('decimal', { nullable: true })
  min_price: number;

  @Column('decimal', { nullable: true })
  max_price: number;

  @Column({ type: 'date', nullable: true })
  bidding_start_date: string;

  @Column({ type: 'date', nullable: true })
  listing_date: string;

  @Column({ nullable: true })
  document_url: string;
}
