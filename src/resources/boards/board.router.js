const boardsService = require('./board.service');

const boardRouter = (fastify, options, done) => {
  fastify.get('/boards', async (request, reply) => {
    boardsService.getAll({ request, reply });
  });

  fastify.get('/boards/:boardId', async (request, reply) => {
    boardsService.getOne({ request, reply });
  });

  fastify.post('/boards', async (request, reply) => {
    boardsService.create({ request, reply });
  });

  fastify.delete('/boards/:boardId', async (request, reply) => {
    boardsService.deleteOne({ request, reply });
  });

  fastify.put('/boards/:boardId', async (request, reply) => {
    boardsService.update({ request, reply });
  });

  done();
};

module.exports = boardRouter;
