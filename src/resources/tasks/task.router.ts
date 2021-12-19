import { FastifyInstance } from 'fastify';
import { BoardParams } from '../boards/board.types';
import tasksService from './task.service';
import { TaskBody, TaskParams } from './task.types';

const taskRouter = async (fastify: FastifyInstance): Promise<void> => {
  /**
   * Uses get method to get all tasks at the board.
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.get<{
    Params: BoardParams;
  }>('/boards/:boardId/tasks', async (request, reply) => {
    tasksService.getAllByBoardID(request, reply);
  });

  /**
   * Uses get method to get task by id at the board.
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.get<{
    Params: TaskParams;
  }>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.getOne(request, reply);
  });

  /**
   * Uses post method to create new task at the board.
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.post<{
    Params: BoardParams;
    Body: TaskBody;
  }>('/boards/:boardId/tasks', async (request, reply) => {
    tasksService.create(request, reply);
  });

  /**
   * Uses delete method to delete task at the board.
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.delete<{
    Params: TaskParams;
  }>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.deleteOne(request, reply);
  });

  /**
   * Uses put method to update task at the board.
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.put<{
    Params: TaskParams;
    Body: TaskBody;
  }>('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.update(request, reply);
  });

  // done();
};

export default taskRouter;
