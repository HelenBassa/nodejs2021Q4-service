import app from './app';
import { PORT } from './common/config';
import * as logger from './common/logger';

const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0', () => {
      app.log.info(`Server starts on port ${PORT}`);
      console.log(`Server starts on port ${PORT}`);
    });
  } catch (error: unknown) {
    logger.fatalLog(app)(error);
  }
};

start();
