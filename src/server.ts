import app from './app';
import { PORT } from './common/config';
import * as logger from './common/logger';

const start = async () => {
  try {
    await app.listen(PORT);
  } catch (error: unknown) {
    logger.fatalLog(app)(error);
  }
};

start();
