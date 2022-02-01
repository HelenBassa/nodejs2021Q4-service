import { FastifyInstance } from 'fastify';
import { LoginBody } from './login.types';
import loginController from './login.controller';

const loginRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: LoginBody }>('/login', async (request, reply) => {
    // await loginController.postLogin(request, reply);
  });
};

export default loginRouter;
