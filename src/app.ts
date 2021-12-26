import fastify from 'fastify';

import * as logger from './common/logger';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = fastify(logger.LOG_CONFIG);

app.addHook('preHandler', (request, _reply, done) => {
  logger.preHandlerLog(request);
  done();
});

app.addHook('onResponse', (_request, reply, done) => {
  logger.onResponseLog(_request, reply);
  done();
});

app.addHook('onSend', (_request, reply, payload, done) => {
  Object.assign(reply, { payload });
  done();
});

app.setErrorHandler((error, request, reply) => {
  reply.status(500).send(`Internal Server Error - ${error}`);
  logger.onResponseLog(request, reply);
});

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

process.on('uncaughtException', logger.fatalLog(app));
process.on('unhandledRejection', logger.fatalLog(app));

export default app;
