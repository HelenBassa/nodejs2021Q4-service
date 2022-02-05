import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { IsntUUIDException } from '../users/errors/isnt-uuid.error';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardNotFoundException } from './errors/board-not-found.errors';
import { validate } from 'uuid';
import { AuthGuard } from '../auth/auth.guard';
import { BoardNoContentException } from './errors/board-no-content.errors';

@Controller('boards')
@UseGuards(AuthGuard)
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
    const boards = this.boardsService.findAll();
    if (boards) {
      return boards;
    }

    throw new BoardNotFoundException('boards');
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    const board = await this.boardsService.findOne(boardId);
    if (board) {
      return board;
    }

    throw new BoardNotFoundException(boardId);
  }

  @Put(':boardId')
  update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    if (!validate(boardId)) {
      throw new IsntUUIDException(boardId);
    }
    const updatedBoard = this.boardsService.update(boardId, updateBoardDto);

    if (updatedBoard) {
      return updatedBoard;
    }

    throw new BoardNotFoundException(boardId);
  }

  @Delete(':boardId')
  async remove(@Param('boardId') boardId: string) {
    const board = await this.findOne(boardId);
    if (board) {
      await this.tasksService.deleteTasksByboardId({ boardId });

      return await this.boardsService.remove(boardId);
    }

    throw new BoardNoContentException(boardId);
  }
}
