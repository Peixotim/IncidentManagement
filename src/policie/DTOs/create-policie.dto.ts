import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PoliceRanks } from '../entity/policie.ranks';
export class CreatePolicie {
  @IsString({ message: 'Error the name must be of type string !' })
  @IsNotEmpty({ message: 'Error the name field cannot be empty !' })
  name: string;

  @IsString({ message: 'Error the badge number must be of type string !' })
  @IsNotEmpty({ message: 'Error the badge number cannot be empty !' })
  badge_number: string;

  @IsString({ message: 'Error the password must be of type string !' })
  @IsNotEmpty({ message: 'Error the password cannot be empty!' })
  @MinLength(8, {
    message: 'Error the minimum password length must be 8 characters !',
  })
  @MaxLength(64, {
    message: 'Error, the maximum password length must be 64 characters !',
  })
  password: string;

  @IsEnum(PoliceRanks, {
    message: 'Error the rank must be in accordance with the enum types !',
  })
  rank: PoliceRanks;
}
