const usersService = require('./user.service');

const userRouter = (fastify, options, done) => {
  fastify.get('/users', async (request, reply) => {
    usersService.getAll({ request, reply });
  });

  fastify.get('/users/:userId', async (request, reply) => {
    usersService.getOne({ request, reply });
  });

  fastify.post('/users', async (request, reply) => {
    usersService.create({ request, reply });
  });

  fastify.delete('/users/:userId', async (request, reply) => {
    usersService.deleteOne({ request, reply });
  });

  fastify.put('/users/:userId', async (request, reply) => {
    usersService.update({ request, reply });
  });

  done();
};

module.exports = userRouter;
