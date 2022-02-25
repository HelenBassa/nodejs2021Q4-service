import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Task with ID: ${id} doesn't exist`, HttpStatus.NOT_FOUND);
  }
}
