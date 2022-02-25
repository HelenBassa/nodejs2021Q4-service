import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity as User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TasksService } from '../tasks/tasks.service';
import { TasksModule } from '../tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    TasksModule,
  ],
  controllers: [UsersController],
  providers: [TypeOrmModule, UsersService, TasksService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
