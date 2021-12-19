import Board from './board.model';
import { BoardBody } from './board.types';

let boardsRepo: Board[] = [];

/**
 * Returns all boards from in-memory DB.
 *
 * @returns array of all boards.
 */
const getAll = () => boardsRepo;

/**
 * Returns board by id from in-memory DB.
 * @param boardID - uuid of board.
 * @returns object of board or undefined if not found.
 */
const getOne = (boardID: string) =>
  boardsRepo.find((board) => board.id === boardID);

/**
 * Creates board in in-memory DB.
 * @param data - object with title and array of columns (with field - title).
 * @returns object of new board with id, title and array of columns (with field - title).
 */
const create = (data: BoardBody) => {
  const { title, columns } = data;
  const createdBoard = new Board(title, columns);
  boardsRepo = [...boardsRepo, createdBoard];
  return createdBoard;
};

/**
 * Deletes board by id from in-memory DB.
 * @param boardID - uuid of board.
 * @returns board if board was found and deleted or null if not.
 */
const deleteOne = (boardID: string) => {
  const deletedBoard = boardsRepo.find((board) => board.id === boardID);
  if (deletedBoard) {
    boardsRepo = boardsRepo.filter((board) => board.id !== boardID);
    return deletedBoard;
  }
  return null;
};

/**
 * Updates board by id in in-memory DB.
 * @param boardID - uuid of board.
 * @param data - object with title and array of columns (with field - title).
 * @returns object of new board with id, title and array of columns (with field - title).
 */
const update = (boardID: string, data: BoardBody) => {
  const { title, columns } = data;
  const id = boardID;
  const updatedBoard = boardsRepo.find((board) => board.id === boardID);
  if (updatedBoard) {
    boardsRepo = boardsRepo.map((board) =>
      board.id === id ? { id, title, columns } : board
    );
  }

  return boardsRepo.find((board) => board.id === id);
};

export default { getAll, getOne, create, deleteOne, update };
