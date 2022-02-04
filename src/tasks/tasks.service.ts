import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardNotFoundException } from '../boards/errors/board-not-found.errors';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskNotFoundException } from './errors/task-not-found.errors';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = { ...createTaskDto, boardId };
    const createdTask = this.tasksRepository.create(task);
    await this.tasksRepository.save(createdTask);
    return createdTask;
  }

  async findAll(boardId: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ where: { boardId } });
    return tasks;
  }

  async findOne(boardId: string, taskId: string): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne({ boardId, id: taskId });
    if (task) {
      return task;
    }
    return null;
  }

  async update(
    boardId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | undefined> {
    const task = await this.tasksRepository.findOne({ boardId, id: taskId });

    if (task) {
      this.tasksRepository.merge(task, updateTaskDto);
      const updatedTask = await this.tasksRepository.save(task);
      return updatedTask;
    }
    return null;
  }

  async remove(boardId: string, taskId: string): Promise<void | undefined> {
    const task = await this.tasksRepository.findOne({ boardId, id: taskId });
    if (task) {
      await this.tasksRepository.delete({
        boardId,
        id: taskId,
      });

      // if (deletedTask === undefined) {
      //   throw new TaskNotFoundException(taskId);
      // }
    }
    return null;
  }

  async deleteTasksByboardId(boardId: string): Promise<void> {
    const tasks = await this.tasksRepository.find({ where: { boardId } });
    if (tasks === undefined) {
      throw new BoardNotFoundException(boardId);
    }
    const tasksIds: string[] = tasks.map((task: Task) => task.id);

    if (tasksIds && tasksIds.length > 0) {
      await this.tasksRepository.delete(tasksIds);
    }
  }
  // async deleteTasksByboardId(boardId: string): Promise<void> {
  //   const task = await this.tasksRepository.find({ boardId });
  //   if (task) {
  //     const deletedTasks = await this.tasksRepository.delete({ boardId });
  //     if (!deletedTasks.affected) {
  //       return null;
  //     }
  //   }
  //   return null;
  // }

  async unassignUser(userId: string): Promise<void> {
    await this.tasksRepository.update(
      { userId },
      { userId: null as unknown as string },
    );
  }
}
