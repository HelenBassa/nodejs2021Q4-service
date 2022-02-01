import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import User from './models/users.model';
import { UserEntity } from './entities/user.entity';
import { WithoutPassUserEntity } from './entities/without-pass-user.entity';

import loginService from '../login/login.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<WithoutPassUserEntity | false> {
    const { name, login, password } = createUserDto;

    if (password) {
      const hashedPassword = await loginService.hashPassword(password);
      const user = new User(name, login, hashedPassword);
      const userNew = this.usersRepository.create(user);
      await this.usersRepository.save(userNew);
      return User.toResponse(userNew);
    }

    return false;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);

    if (user) {
      const newPassword = `${updateUserDto.password}`;
      const hashedPassword = await loginService.hashPassword(newPassword);
      const newUser = {
        ...updateUserDto,
        password: hashedPassword,
      };

      this.usersRepository.merge(user, newUser);
      const results = await this.usersRepository.save(user);
      return results;
    }

    return null;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getUserByProps(login: string): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.findOne({ where: { login } });
    if (!user) {
      return null;
    }
    return user;
  }
}
