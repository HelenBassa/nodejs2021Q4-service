import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JWT_SECRET_KEY } from '../common/config';
import { SALT } from '../common/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  SECRET_KEY = `${JWT_SECRET_KEY}`;

  async signToken(userLogin: string, password: string): Promise<string | null> {
    const user = await this.usersService.getUserByProps(userLogin);
    if (!user) {
      return null;
    }
    const { password: hashedPassword } = user;
    if (hashedPassword) {
      const isSimilar = await this.checkPassword(password, hashedPassword);
      if (isSimilar) {
        const { id, login } = user;
        const token = jwt.sign({ id, login }, this.SECRET_KEY);
        return token;
      }
    }
    return null;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async checkPassword(password: string, hash: string) {
    const isSimilar = await bcrypt.compare(password, hash);
    return isSimilar;
  }
}
