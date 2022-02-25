import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { WrongLoginPassException } from './errors/wrong-login-pass.error';
import { UserEntity as User } from '../users/entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const user = await this.validateUser(userLoginDto);
    if (user) {
      return this.generateToken(user);
    }

    throw new WrongLoginPassException();
  }

  async validateUser(userLoginDto: UserLoginDto) {
    const user = await this.usersService.getUserByProps(userLoginDto.login);
    const isSimilar = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );
    if (user && isSimilar) {
      return user;
    }
    return null;
  }

  generateToken(user: User) {
    const payload = { id: user.id, login: user.login };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
