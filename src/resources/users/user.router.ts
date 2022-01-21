import { FastifyInstance } from 'fastify';

import { UserBody, UserParams } from './user.types';
import usersService from './user.service';

const userRouter = async (fastify: FastifyInstance): Promise<void> => {
  /**
   * Uses get method to get all users
   * @param _ - incoming request object, not used
   * @param reply - outcoming reply object
   */
  fastify.get('/users', async (_, reply) => {
    await usersService.getAll(reply);
  });

  /**
   * Uses get method to get user by id
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.get<{ Params: UserParams }>(
    '/users/:userId',
    async (request, reply) => {
      await usersService.getOne(request, reply);
    }
  );

  /**
   * Uses post method to create new user
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.post<{ Body: UserBody }>('/users', async (request, reply) => {
    await usersService.create(request, reply);
  });

  /**
   * Uses delete method to delete user
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.delete<{ Params: UserParams }>(
    '/users/:userId',
    async (request, reply) => {
      await usersService.deleteOne(request, reply);
    }
  );

  /**
   * Uses put method to update user
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.put<{
    Params: UserParams;
    Body: UserBody;
  }>('/users/:userId', async (request, reply) => {
    await usersService.update(request, reply);
  });
};

export default userRouter;
