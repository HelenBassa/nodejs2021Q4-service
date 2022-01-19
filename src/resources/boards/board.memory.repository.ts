import { getRepository } from 'typeorm';

import Board from './board.model';
import Column from '../columns/column.model';
import { BoardBody } from './board.types';
import { Board as BoardEntity } from '../../entity/Board';
import { BoardColumn } from '../../entity/Column';

/**
 * Returns all boards from Postgres DB.
 * @returns array of all boards.
 */
const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(BoardEntity);
  const boards = await boardRepository.find({ relations: ['columns'] });
  return boards;
};

/**
 * Returns board by id from Postgres DB.
 * @param boardId - uuid of board.
 * @returns object of board or undefined if not found.
 */
const getOne = async (boardId: string): Promise<Board | undefined> => {
  const boardRepository = getRepository(BoardEntity);
  const board: BoardEntity | undefined = await boardRepository.findOne(
    boardId,
    { relations: ['columns'] }
  );
  return board;
};

/**
 * Creates board in Postgres DB.
 * @param data - object with title and array of columns (with fields - title and order).
 * @returns object of new board with id, title and array of columns (with fields - title and order).
 */
const create = async (data: BoardBody): Promise<Board> => {
  const columnRepository = getRepository(BoardColumn);
  const boardRepository = getRepository(BoardEntity);

  const board = new BoardEntity();
  board.title = data.title;
  await boardRepository.save(board);

  if (data.columns) {
    const columnsEntity: BoardColumn[] = data.columns.map((column: Column) => {
      const columnEntity = new BoardColumn();
      columnEntity.title = column.title;
      columnEntity.order = column.order;
      columnEntity.board = board;
      return columnEntity;
    });
    await Promise.all(
      columnsEntity.map((column: BoardColumn) => columnRepository.save(column))
    );
  }

  const joinedBoard: BoardEntity = (await boardRepository.findOne(board.id, {
    relations: ['columns'],
  })) as BoardEntity;

  return joinedBoard;
};

/**
 * Deletes board by id from Postgres DB.
 * @param boardId - uuid of board.
 * @returns board if board was found and deleted or null if not.
 */
const deleteOne = async (boardId: string): Promise<Board | null> => {
  const boardRepository = getRepository(BoardEntity);
  const columnsRepository = getRepository(BoardColumn);
  const board = await boardRepository.findOne(boardId);

  if (board) {
    const columns = await columnsRepository.find({ where: { board } });

    if (columns && columns.length > 0) {
      await columnsRepository.delete(columns.map((column) => column.id));
    }

    const results = await boardRepository.delete(boardId);

    if (results && board) {
      return board;
    }
  }
  return null;
};

/**
 * Updates board by id in Postgres DB.
 * @param boardId - uuid of board.
 * @param data - object with title and array of columns (with fields - title and order).
 * @returns object of new board with id, title and array of columns (with fields - title and order).
 */
const update = async (
  boardId: string,
  data: BoardBody
): Promise<Board | null> => {
  const boardRepository = getRepository(BoardEntity);
  const board = await boardRepository.findOne(boardId);

  if (board) {
    boardRepository.merge(board, data);
    const results = await boardRepository.save(board);
    return results;
  }
  return null;
};

export default { getAll, getOne, create, deleteOne, update };
