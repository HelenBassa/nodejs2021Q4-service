import { FastifyInstance } from 'fastify';

import { BoardBody, BoardParams } from './board.types';
import boardsService from './board.service';

const boardRouter = async (fastify: FastifyInstance): Promise<void> => {
  /**
   * Uses get method to get all boards
   * @param _ - incoming request object, not used
   * @param reply - outcoming reply object
   */
  fastify.get('/boards', async (_, reply) => {
    await boardsService.getAll(reply);
  });

  /**
   * Uses get method to get board by id
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.get<{ Params: BoardParams }>(
    '/boards/:boardId',
    async (request, reply) => {
      await boardsService.getOne(request, reply);
    }
  );

  /**
   * Uses post method to create new board
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.post<{ Body: BoardBody }>('/boards', async (request, reply) => {
    await boardsService.create(request, reply);
  });

  /**
   * Uses delete method to delete board
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.delete<{ Params: BoardParams }>(
    '/boards/:boardId',
    async (request, reply) => {
      await boardsService.deleteOne(request, reply);
    }
  );

  /**
   * Uses put method to update board
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.put<{
    Params: BoardParams;
    Body: BoardBody;
  }>('/boards/:boardId', async (request, reply) => {
    await boardsService.update(request, reply);
  });
};

export default boardRouter;
