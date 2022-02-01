import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { WithoutPassUserEntity } from '../entities/without-pass-user.entity';

export interface UsersStorage {
  getAll: () => UserEntity[];
  getOne: (id: string) => UserEntity | undefined;
  create: (params: CreateUserDto) => WithoutPassUserEntity;
  update: (user: UserDto, params: UpdateUserDto) => UserEntity;
  deleteOne: (id: string) => void;
}

// export type UserBody = {
//   name: string;
//   login: string;
//   password: string;
// };
