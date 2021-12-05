const Board = require('./board.model');

let boardsRepo = [];

const getAll = () => boardsRepo;

const getOne = (boardID) => boardsRepo.find((board) => board.id === boardID);

const create = (data) => {
  const { title, columns } = data;
  const createdBoard = new Board({ title, columns });
  boardsRepo = [...boardsRepo, createdBoard];
  return createdBoard;
};

const deleteOne = (boardID) => {
  const deletedBoard = boardsRepo.find((board) => board.id === boardID);
  if (deletedBoard) {
    boardsRepo = boardsRepo.filter((board) => board.id !== boardID);
    return deletedBoard;
  }
  return null;
};

const update = ({ boardID, data }) => {
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

module.exports = { getAll, getOne, create, deleteOne, update };
