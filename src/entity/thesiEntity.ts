import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thesi')
export class Thesi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  thesiId: string;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @Column({ type: 'varchar', length: 255 })
  cocAssetClass: string;

  @Column({ type: 'varchar', length: 255 })
  thepiId: string;

  @Column({ type: 'varchar', length: 255 })
  thesisName: string;

  @Column({ type: 'varchar', length: 255 })
  mode: string; 
  // 'Inception' or 'Annual Review'

  @Column({ type: 'varchar', length: 255 })
  lastUpdatedBy: string;
  // User ID of the last updater

  @Column({ type: 'varchar', length: 255, default: 'no' })
  reviewRequired: string; 
  // 'yes' or 'no'
}
