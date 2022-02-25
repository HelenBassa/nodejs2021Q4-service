import { ConnectionOptions } from 'typeorm';
import path from 'path';

import { POSTGRES_PORT } from './common/config';
import { UserEntity as User } from './users/entities/user.entity';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { BoardColumn } from './boards/entities/column.entity';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: 'db',
  port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  synchronize: true,
  logging: false,
  migrationsRun: false,
  entities: [User, Board, BoardColumn, Task],
  migrations: [path.join(__dirname, './migration/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default connectionOptions;
