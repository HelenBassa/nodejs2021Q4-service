import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity as User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [TypeOrmModule, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
