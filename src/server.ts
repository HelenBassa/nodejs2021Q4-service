import { createConnection } from 'typeorm';
import 'reflect-metadata';

import * as logger from './common/logger';
import { PORT } from './common/config';
import options from './ormconfig';

import app from './app';
import loginService from './resources/login/login.service';

createConnection(options)
  .then(async () => {
    app.listen(PORT, '0.0.0.0');
    await loginService.addAdmin();
  })
  .catch((error: unknown) => {
    logger.fatalLog(app)(error);
  });
