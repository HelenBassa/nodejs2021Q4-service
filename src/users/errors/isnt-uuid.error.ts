import { HttpException, HttpStatus } from '@nestjs/common';

export class IsntUUIDException extends HttpException {
  constructor(id: string) {
    super(`This ID: ${id} isn't UUID`, HttpStatus.BAD_REQUEST);
  }
}
