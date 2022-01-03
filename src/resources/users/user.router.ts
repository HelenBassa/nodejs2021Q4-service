import { FastifyInstance } from 'fastify';
import usersService from './user.service';
import { UserBody, UserParams } from './user.types';

const userRouter = async (fastify: FastifyInstance): Promise<void> => {
  /**
   * Uses get method to get all users
   * @param _ - incoming request object, not used
   * @param reply - outcoming reply object
   */
  fastify.get('/users', async (_, reply) => {
    usersService.getAll(reply);
  });

  /**
   * Uses get method to get user by id
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.get<{ Params: UserParams }>(
    '/users/:userId',
    async (request, reply) => {
      usersService.getOne(request, reply);
    }
  );

  /**
   * Uses post method to create new user
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.post<{ Body: UserBody }>('/users', async (request, reply) => {
    usersService.create(request, reply);
  });

  /**
   * Uses delete method to delete user
   * @param request - incoming request object
   * @param reply - outcoming reply object
   */
  fastify.delete<{ Params: UserParams }>(
    '/users/:userId',
    async (request, reply) => {
      usersService.deleteOne(request, reply);
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
    usersService.update(request, reply);
  });
};

export default userRouter;
