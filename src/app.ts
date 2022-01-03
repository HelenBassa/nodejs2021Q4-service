import fastify from 'fastify';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = fastify({ logger: true });

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

export default app;
