import { FastifyInstance } from 'fastify';
import { BoardParams } from '../boards/board.types';
import tasksService from './task.service';
import { TaskBody, TaskParams } from './task.types';

const taskRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get<{
    Params: BoardParams;
  }>('/boards/:boardId/tasks', async (request, reply) => {
    tasksService.getAllByBoardID(request, reply);
  });

  fastify.get<{
    Params: TaskParams;
  }>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.getOne(request, reply);
  });

  fastify.post<{
    Params: BoardParams;
    Body: TaskBody;
  }>('/boards/:boardId/tasks', async (request, reply) => {
    tasksService.create(request, reply);
  });

  fastify.delete<{
    Params: TaskParams;
  }>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.deleteOne(request, reply);
  });

  fastify.put<{
    Params: TaskParams;
    Body: TaskBody;
  }>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.update(request, reply);
  });

  // done();
};

export default taskRouter;
