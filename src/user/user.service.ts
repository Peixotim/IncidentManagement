import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { CreateUser } from './DTOs/create-user.dto';
import * as bycrpt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(request: CreateUser): Promise<UserEntity> {
    const saltRounds: number = 12;
    try {
      const requestUser: CreateUser = request;
      const isExists = await this.userRepository.exists({
        where: { badge_number: requestUser.badge_number },
      });

      if (isExists === true) {
        throw new HttpException(
          `Error the user with badge number is already registered in our database!`,
          HttpStatus.CONFLICT,
        );
      }
      const salt = await bycrpt.genSalt(saltRounds);
      const hash = await bycrpt.hash(requestUser.password, salt);
      const newUser: UserEntity = this.userRepository.create({
        name: requestUser.name,
        badge_number: requestUser.badge_number,
        password: hash,
        rank: requestUser.rank,
      });
      const saved: UserEntity = await this.userRepository.save(newUser);

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
}
