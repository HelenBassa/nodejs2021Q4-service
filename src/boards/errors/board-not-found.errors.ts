import { HttpException, HttpStatus } from '@nestjs/common';

export class BoardNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Board with ID: ${id} doesn't exist`, HttpStatus.NOT_FOUND);
  }
}
