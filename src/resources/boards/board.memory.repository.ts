import Board from './board.model';
import { BoardBody } from './board.types';

let boardsRepo: Board[] = [];

const getAll = () => boardsRepo;

const getOne = (boardID: string) =>
  boardsRepo.find((board) => board.id === boardID);

const create = (data: BoardBody) => {
  const { title, columns } = data;
  const createdBoard = new Board(title, columns);
  boardsRepo = [...boardsRepo, createdBoard];
  return createdBoard;
};

const deleteOne = (boardID: string) => {
  const deletedBoard = boardsRepo.find((board) => board.id === boardID);
  if (deletedBoard) {
    boardsRepo = boardsRepo.filter((board) => board.id !== boardID);
    return deletedBoard;
  }
  return null;
};

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
