import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';

import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} from './common/config';

dotenv.config({
  path: path.join(__dirname, './.env'),
});

const options: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  migrationsRun: false,
  entities: [path.join(__dirname, './entity/*{.ts,.js}')],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default options;
