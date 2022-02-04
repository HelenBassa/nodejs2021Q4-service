import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { validate } from 'uuid';
import { IsntUUIDException } from '../users/errors/isnt-uuid.error';
import { TaskNotFoundException } from './errors/task-not-found.errors';

@Controller('boards')
// @UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get(':boardId/tasks')
  findAll(@Param('boardId') boardId: string) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    return this.tasksService.findAll(boardId);
  }

  @Get(':boardId/tasks/:taskId')
  findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    if (!validate(taskId)) {
      throw new IsntUUIDException(taskId);
    }

    const task = this.tasksService.findOne(boardId, taskId);

    if (task) {
      return task;
    }

    throw new TaskNotFoundException(taskId);
  }

  @Put(':boardId/tasks/:taskId')
  update(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    if (!validate(taskId)) {
      throw new IsntUUIDException(taskId);
    }
    const updatedTask = this.tasksService.update(
      boardId,
      taskId,
      updateTaskDto,
    );

    if (updatedTask) {
      return updatedTask;
    }

    throw new TaskNotFoundException(taskId);
  }

  @Delete(':boardId/tasks/:taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    if (!validate(taskId)) {
      throw new IsntUUIDException(taskId);
    }

    await this.tasksService.remove(boardId, taskId);

    // const deletedTask = await this.tasksService.remove(boardId, taskId);

    // if (deletedTask === undefined) {
    //   throw new TaskNotFoundException(taskId);
    // }
  }
}
