import { Module } from '@nestjs/common';
import { PolicieService } from './policie.service';
import { UserController } from './policie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliceEntity } from './entity/policie.entity';

@Module({
  controllers: [UserController],
  providers: [PolicieService],
  imports: [TypeOrmModule.forFeature([PoliceEntity])],
})
export class PolicieModule {}
