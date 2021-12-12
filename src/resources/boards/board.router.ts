import { FastifyInstance } from 'fastify';
import boardsService from './board.service';
import { BoardBody, BoardParams } from './board.types';

const boardRouter = (fastify: FastifyInstance) => {
  fastify.get('/boards', async (_, reply) => {
    boardsService.getAll(reply);
  });

  fastify.get<{ Params: BoardParams }>(
    '/boards/:boardId',
    async (request, reply) => {
      boardsService.getOne(request, reply);
    }
  );

  fastify.post<{ Body: BoardBody }>('/boards', async (request, reply) => {
    boardsService.create(request, reply);
  });

  fastify.delete<{ Params: BoardParams }>(
    '/boards/:boardId',
    async (request, reply) => {
      boardsService.deleteOne(request, reply);
    }
  );

  fastify.put<{
    Params: BoardParams;
    Body: BoardBody;
  }>('/boards/:boardId', async (request, reply) => {
    boardsService.update(request, reply);
  });

  // done();
};

export default boardRouter;
