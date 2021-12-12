import { FastifyReply, FastifyRequest } from 'fastify';
import { validate } from 'uuid';
import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';
import { BoardBody, BoardParams } from './board.types';

const getAll = (reply: FastifyReply) => {
  const boards = boardsRepo.getAll();
  reply.code(200).send(boards);
};

const getOne = (
  request: FastifyRequest<{ Params: BoardParams }>,
  reply: FastifyReply
) => {
  const boardID = request.params.id;

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

const create = (
  request: FastifyRequest<{ Body: BoardBody }>,
  reply: FastifyReply
) => {
  const data = request.body;
  const createdBoard = boardsRepo.create(data);
  reply.code(201).send(createdBoard);
};

const deleteOne = (
  request: FastifyRequest<{ Params: BoardParams }>,
  reply: FastifyReply
) => {
  const boardID = request.params.id;

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const deletedBoard = boardsRepo.deleteOne(boardID);

  if (deletedBoard) {
    const tasksOnBoard = tasksService.getAllByBoardID(boardID);
    tasksService.deleteTasksOnBoard(tasksOnBoard);
    reply.code(204);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardID} doesn't exist` });
  }
};

const update = (
  request: FastifyRequest<{ Params: BoardParams; Body: BoardBody }>,
  reply: FastifyReply
) => {
  const boardID = request.params.id;
  const data = request.body;

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const updatedBoard = boardsRepo.update(boardID, data);

  if (updatedBoard) {
    reply.code(200).send(updatedBoard);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardID} doesn't exist` });
  }
};

export default { getAll, getOne, create, deleteOne, update };
