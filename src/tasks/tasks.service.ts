import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

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
    const tasks = await this.tasksRepository.find({ boardId });
    if (tasks) {
      return tasks;
    }
    return null;
  }

  async findOne(boardId: string, taskId: string): Promise<Task | null> {
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
    }
    return null;
  }

  async deleteTasksByboardId({ boardId }): Promise<void> {
    const task = await this.tasksRepository.find({ boardId });
    if (task) {
      await this.tasksRepository.delete({ boardId });
    }
    return null;
  }

  async unassignUser(userId: string): Promise<void> {
    await this.tasksRepository.update(
      { userId },
      { userId: null as unknown as string },
    );
  }
}
