import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNoContentException extends HttpException {
  constructor(id: string) {
    super(`Task with ID: ${id} doesn't exist`, HttpStatus.NO_CONTENT);
  }
}
