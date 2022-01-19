import { createConnection } from 'typeorm';
import 'reflect-metadata';

import * as logger from './common/logger';
import { PORT } from './common/config';
import options from './ormconfig';

import app from './app';

createConnection(options)
  .then(async () => {
    app.listen(PORT, '0.0.0.0', () => {
      app.log.info(`Server starts on port ${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.log('TypeORM connection error: ', error);
    logger.fatalLog(app)(error);
  });
