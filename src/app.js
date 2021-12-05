const fastify = require('fastify')({ logger: true });

const userRouter = require('./resources/users/user.router');

fastify.register(userRouter);

module.exports = fastify;
