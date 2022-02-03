import { CanActivate, ExecutionContext } from '@nestjs/common';
import { APP_URL, AUTH_TYPE } from '../common/constants';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { UnauthorizedUserException } from './errors/unauthorized-user.error';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const SECRET_KEY = `${JWT_SECRET_KEY}`;

    const request = context.switchToHttp().getRequest();
    if (
      !(
        request.url === APP_URL.ROOT ||
        request.url === APP_URL.DOC ||
        request.url === APP_URL.LOGIN
      )
    ) {
      console.log(request.headers);
      const authHeader = request.headers.authorization;
      console.log(authHeader);

      if (authHeader !== undefined) {
        const tokenStr = request.headers.authorization;
        if (tokenStr) {
          const [type, token] = tokenStr.split(' ');

          if (type !== AUTH_TYPE) {
            throw new UnauthorizedUserException();
          } else {
            try {
              const auth = jwt.verify(token, SECRET_KEY);
              if (auth) {
                return true;
              } else {
                return false;
              }
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
