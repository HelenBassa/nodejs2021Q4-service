const { validate } = require('uuid');
const boardsRepo = require('./board.memory.repository');

const getAll = ({ reply }) => {
  const boards = boardsRepo.getAll();
  reply.code(200).send(boards);
};

const getOne = ({ request, reply }) => {
  const boardID = request.params.boardId;

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const board = boardsRepo.getOne(boardID);

  if (board) {
    reply.code(200).send(board);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardID} doesn't exist` });
  }
};

const create = ({ request, reply }) => {
  const data = request.body;
  const createdBoard = boardsRepo.create(data);
  reply.code(201).send(createdBoard);
};

const deleteOne = ({ request, reply }) => {
  const boardID = request.params.boardId;

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const deletedBoard = boardsRepo.deleteOne(boardID);

  if (deletedBoard) {
    reply.code(204);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardID} doesn't exist` });
  }
};

const update = ({ request, reply }) => {
  const boardID = request.params.boardId;
  const data = request.body;

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const updatedBoard = boardsRepo.update({ boardID, data });

  if (updatedBoard) {
    reply.code(200).send(updatedBoard);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardID} doesn't exist` });
  }
};

module.exports = { getAll, getOne, create, deleteOne, update };
