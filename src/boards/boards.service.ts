import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = this.boardsRepository.create(createBoardDto);
    await this.boardsRepository.save(createdBoard);
    return createdBoard;
  }

  async findAll(): Promise<Board[]> {
    const boards = await this.boardsRepository.find({ relations: ['columns'] });
    if (boards) {
      return boards;
    }
    return null;
  }

  async findOne(boardId: string): Promise<Board | null> {
    const board = await this.boardsRepository.findOne(boardId, {
      relations: ['columns'],
    });
    if (board) {
      return board;
    }
    return null;
  }

  async update(
    boardId: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board | null> {
    const board = await this.boardsRepository.findOne(boardId);

    if (board) {
      this.boardsRepository.merge(board, updateBoardDto);
      const updatedBoard = await this.boardsRepository.save(board);
      return updatedBoard;
    }
    return null;
  }

  async remove(boardId: string): Promise<void | undefined> {
    const board = await this.boardsRepository.findOne(boardId);
    if (board) {
      await this.boardsRepository.delete(boardId);
    }

    return null;
  }
}
