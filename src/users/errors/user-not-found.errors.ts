import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(`User with ID: ${id} doesn't exist`, HttpStatus.NOT_FOUND);
  }
}
