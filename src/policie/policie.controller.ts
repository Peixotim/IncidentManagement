import { Body, Controller, Post } from '@nestjs/common';
import { PolicieService } from './policie.service';
import { CreatePolicie } from './DTOs/create-user.dto';
import { PoliceEntity } from './entity/policie.entity';

@Controller('user')
export class PolicieController {
  constructor(private readonly userService: PolicieService) {}

  @Post()
  public async createUser(
    @Body() request: CreatePolicie,
  ): Promise<PoliceEntity> {
    return this.userService.createUser(request);
  }
}
