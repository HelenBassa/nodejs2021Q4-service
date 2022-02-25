import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongLoginPassException extends HttpException {
  constructor() {
    super('Wrong login/password combination!', HttpStatus.FORBIDDEN);
  }
}
