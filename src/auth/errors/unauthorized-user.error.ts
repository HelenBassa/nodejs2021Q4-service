import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedUserException extends HttpException {
  constructor() {
    super(`Unauthorized user`, HttpStatus.UNAUTHORIZED);
  }
}
