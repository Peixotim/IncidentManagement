import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRanks } from './user.ranks';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ unique: true, type: 'varchar' })
  badge_number: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: UserRanks })
  rank: UserRanks;
}
