import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PoliceEntity } from './entity/policie.entity';
import { CreatePolicie } from './DTOs/create-policie.dto';
import * as bcrypt from 'bcrypt';
import { LoginPolicie } from './DTOs/login-policie.dto';

@Injectable()
export class PolicieService {
  private readonly logger = new Logger(PolicieService.name);

  constructor(
    @InjectRepository(PoliceEntity)
    private readonly policeRepository: Repository<PoliceEntity>,
  ) {}

  public async createUser(request: CreatePolicie): Promise<PoliceEntity> {
    const saltRounds: number = 12;
    try {
      const isExists = await this.policeRepository.exists({
        where: { badge_number: request.badge_number },
      });

      if (isExists === true) {
        throw new HttpException(
          `Error the user with badge number is already registered in our database!`,
          HttpStatus.CONFLICT,
        );
      }

      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(request.password, salt);

      const newPoliceOfficer: PoliceEntity = this.policeRepository.create({
        name: request.name,
        badge_number: request.badge_number,
        password: hash,
        rank: request.rank,
      });

      const saved: PoliceEntity =
        await this.policeRepository.save(newPoliceOfficer);

      return saved;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(
        `Unhandled failure when creating user: ${error}`,
        error instanceof Error ? error.stack : undefined,
      );

      throw new InternalServerErrorException(
        `An unexpected error occurred when trying to create the user.`,
      );
    }
  }

  public async loginUser(request: LoginPolicie): Promise<PoliceEntity> {
    try {
      const find = await this.policeRepository.findOneBy({
        badge_number: request.badge_number,
      });

      if (!find) {
        throw new HttpException(
          `Error, there is no police officer with this badge number registered in the database`,
          HttpStatus.NOT_FOUND,
        );
      }

      const isMatch = await bcrypt.compare(request.password, find.password);
      if (isMatch) {
        return find;
      } else {
        throw new HttpException(
          `Error when trying to log in check password the password entered`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error(
        `Unhandled failure when creating user: ${error}`,
        error instanceof Error ? error.stack : undefined,
      );

      throw new InternalServerErrorException(
        `An unexpected error occurred when trying to create the user.`,
      );
    }
  }
}
