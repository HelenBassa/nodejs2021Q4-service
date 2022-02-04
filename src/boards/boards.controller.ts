import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { IsntUUIDException } from '../users/errors/isnt-uuid.error';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardNotFoundException } from './errors/board-not-found.errors';
import { validate } from 'uuid';

@Controller('boards')
// @UseGuards(AuthGuard)
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }
    const board = this.boardsService.findOne(id);
    if (board) {
      return board;
    }

    throw new BoardNotFoundException(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }
    const updatedBoard = this.boardsService.update(id, updateBoardDto);

    if (updatedBoard) {
      return updatedBoard;
    }

    throw new BoardNotFoundException(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!validate(id)) {
      throw new IsntUUIDException(id);
    }

    await this.tasksService.deleteTasksByboardId(id);

    await this.boardsService.remove(id);

    // const deletedBoard = await this.boardsService.remove(id);

    // if (deletedBoard === undefined) {
    //   throw new BoardNotFoundException(id);
    // }
  }
}
