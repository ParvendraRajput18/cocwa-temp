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
}
