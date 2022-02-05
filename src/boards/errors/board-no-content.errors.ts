import { HttpException, HttpStatus } from '@nestjs/common';

export class BoardNoContentException extends HttpException {
  constructor(id: string) {
    super(`Board with ID: ${id} doesn't exist`, HttpStatus.NO_CONTENT);
  }
}
