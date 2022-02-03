import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { WrongLoginPassException } from './errors/wrong-login-pass.error';
import { Token } from './interfaces/token.interface';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async postLogin(@Body() userLoginDto: UserLoginDto): Promise<Token | null> {
    const { login, password } = userLoginDto;
    const token = await this.authService.signToken(login, password);
    if (!token) {
      throw new WrongLoginPassException();
    } else {
      return { token };
    }
  }
}
