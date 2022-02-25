import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { validate } from 'uuid';
import { IsntUUIDException } from '../users/errors/isnt-uuid.error';
import { TaskNotFoundException } from './errors/task-not-found.errors';
import { AuthGuard } from '../auth/auth.guard';
import { TaskNoContentException } from './errors/task-no-content.errors';

@Controller('/boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  findAll(@Param('boardId') boardId: string) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    const tasks = this.tasksService.findAll(boardId);

    if (tasks) {
      return tasks;
    }

    throw new TaskNotFoundException(boardId);
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    if (!validate(taskId)) {
      throw new IsntUUIDException(taskId);
    }

    const task = await this.tasksService.findOne(boardId, taskId);
    if (task) {
      return task;
    }

    throw new TaskNotFoundException(taskId);
  }

  @Put(':taskId')
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

  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    const task = await this.findOne(boardId, taskId);

    if (task) {
      return await this.tasksService.remove(boardId, taskId);
    }

    throw new TaskNoContentException(taskId);
  }
}
