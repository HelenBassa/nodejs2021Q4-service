const tasksService = require('./task.service');

const taskRouter = (fastify, options, done) => {
  fastify.get('/boards/:boardId/tasks', async (request, reply) => {
    tasksService.getAll({ request, reply });
  });

  fastify.get('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.getOne({ request, reply });
  });

  fastify.post('/boards/:boardId/tasks', async (request, reply) => {
    tasksService.create({ request, reply });
  });

  fastify.delete('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.deleteOne({ request, reply });
  });

  fastify.put('/boards/:boardId/tasks/:taskId', async (request, reply) => {
    tasksService.update({ request, reply });
  });

  done();
};

module.exports = taskRouter;
