import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { TasksService } from '../tasks/tasks.service';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TasksModule],
  controllers: [BoardsController],
  providers: [BoardsService, TasksService],
  exports: [TypeOrmModule, BoardsService],
})
export class BoardsModule {}
