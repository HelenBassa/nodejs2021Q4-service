import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class WithoutPassUserDto extends OmitType(UserDto, [
  'password',
] as const) {}
