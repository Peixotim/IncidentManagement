import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PoliceRanks } from './policie.ranks';
@Entity()
export class PoliceEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ unique: true, type: 'varchar' })
  badge_number: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: PoliceRanks })
  rank: PoliceRanks;

  @CreateDateColumn()
  createdAt: Date;
}
