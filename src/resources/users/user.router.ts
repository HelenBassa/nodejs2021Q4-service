import { FastifyInstance } from 'fastify';
import usersService from './user.service';
import { UserBody, UserParams } from './user.types';

const userRouter = async (fastify: FastifyInstance) => {
  fastify.get('/users', async (_, reply) => {
    usersService.getAll(reply);
  });

  fastify.get<{ Params: UserParams }>(
    '/users/:userId',
    async (request, reply) => {
      usersService.getOne(request, reply);
    }
  );

  fastify.post<{ Body: UserBody }>('/users', async (request, reply) => {
    usersService.create(request, reply);
  });

  fastify.delete<{ Params: UserParams }>(
    '/users/:userId',
    async (request, reply) => {
      usersService.deleteOne(request, reply);
    }
  );

  fastify.put<{
    Params: UserParams;
    Body: UserBody;
  }>('/users/:userId', async (request, reply) => {
    usersService.update(request, reply);
  });

  // done();
};

export default userRouter;
