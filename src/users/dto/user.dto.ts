import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
