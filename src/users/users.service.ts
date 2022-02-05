import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import User from './models/users.model';
import { UserEntity } from './entities/user.entity';
import { WithoutPassUserEntity } from './entities/without-pass-user.entity';

import { LOGIN, NAME, PASSWORD, SALT } from '../common/constants';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<WithoutPassUserEntity | false> {
    const { name, login, password } = createUserDto;

    if (password) {
      const hashedPassword = await this.hashPassword(password);
      const user = new User(name, login, hashedPassword);
      const createdUser = this.usersRepository.create(user);
      await this.usersRepository.save(createdUser);
      return User.toResponse(createdUser);
    }

    return false;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      return user;
    }
    return null;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.findOne(id);

    if (user) {
      const newPassword = `${updateUserDto.password}`;
      const hashedPassword = await this.hashPassword(newPassword);
      const newUser = {
        ...updateUserDto,
        password: hashedPassword,
      };

      this.usersRepository.merge(user, newUser);
      const updatedUser = await this.usersRepository.save(user);
      return updatedUser;
    }

    return null;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async getUserByProps(login: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ login });
    if (user) {
      return user;
    }
    return null;
  }

  async addAdmin(): Promise<WithoutPassUserEntity | false> {
    const admin = await this.usersRepository.findOne({
      where: { login: LOGIN },
    });
    console.log('admin is exist>>>', admin);
    if (!admin) {
      const hash = await this.hashPassword(PASSWORD);
      const newUser = new User(NAME, LOGIN, hash);
      console.log('admin >>>', newUser);

      await this.usersRepository.save(newUser);
      return User.toResponse(newUser);
    }
    return null;
  }
}
