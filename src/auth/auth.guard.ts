import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { APP_URL, AUTH_TYPE } from '../common/constants';
import { UnauthorizedUserException } from './errors/unauthorized-user.error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      !(
        request.url === APP_URL.ROOT ||
        request.url === APP_URL.DOC ||
        request.url === APP_URL.LOGIN
      )
    ) {
      const authHeader = request.headers.authorization;

      if (authHeader !== undefined) {
        const tokenStr = request.headers.authorization;

        if (tokenStr) {
          const [type, token] = tokenStr.split(' ');

          if (type !== AUTH_TYPE) {
            throw new UnauthorizedUserException();
          } else {
            try {
              const user = await this.jwtService.verify(token);
              request.user = user;
              return true;
            } catch (e) {
              throw new UnauthorizedUserException();
            }
          }
        } else {
          throw new UnauthorizedUserException();
        }
      } else {
        throw new UnauthorizedUserException();
      }
    }
  }
}
