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
import { UserEntity as User } from './users/entities/user.entity';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { BoardColumn } from './boards/entities/column.entity';

// dotenv.config({
//   path: path.join(__dirname, './.env'),
// });

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: /*POSTGRES_HOST*/ 'db',
  port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
  username: /*POSTGRES_USER*/ 'postgres',
  password: /*POSTGRES_PASSWORD*/ 'password',
  database: /*POSTGRES_DB*/ 'postgres',
  synchronize: true,
  logging: false,
  migrationsRun: false,
  // entities: [path.join(__dirname, './entity/*{.ts,.js}')],
  entities: [User, Board, BoardColumn, Task],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default connectionOptions;
