import { IsNotEmpty, IsString } from 'class-validator';
export class LoginPolicie {
  @IsString()
  @IsNotEmpty()
  badge_number: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
