const fastify = require('fastify')({ logger: true });

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

fastify.register(userRouter);
fastify.register(boardRouter);
fastify.register(taskRouter);

module.exports = fastify;
