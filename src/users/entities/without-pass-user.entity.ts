import { OmitType } from '@nestjs/mapped-types';
import { Entity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class WithoutPassUserEntity extends OmitType(UserEntity, [
  'password',
] as const) {}
