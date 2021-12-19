import { FastifyReply, FastifyRequest } from 'fastify';
import { validate } from 'uuid';
import boardsRepo from './board.memory.repository';
import tasksService from '../tasks/task.service';
import { BoardBody, BoardParams } from './board.types';

/**
 * Handles incoming request to get all boards
 * @param _ - incoming request object, not used
 * @param reply - outcoming reply object
 */
const getAll = async (reply: FastifyReply) => {
  const boards = boardsRepo.getAll();
  reply.code(200).send(boards);
};

/**
 * Handles incoming request to get board by id
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const getOne = async (
  request: FastifyRequest<{ Params: BoardParams }>,
  reply: FastifyReply
) => {
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

/**
 * Handles incoming request to create new board
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const create = async (
  request: FastifyRequest<{ Body: BoardBody }>,
  reply: FastifyReply
) => {
  const data = request.body;
  const createdBoard = boardsRepo.create(data);
  reply.code(201).send(createdBoard);
};

/**
 * Handles incoming request to delete board
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const deleteOne = async (
  request: FastifyRequest<{ Params: BoardParams }>,
  reply: FastifyReply
) => {
  const boardID = request.params.boardId;

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const deletedBoard = boardsRepo.deleteOne(boardID);

  if (deletedBoard) {
    // const tasksOnBoard = tasksService.getAllTasksByBoardID(boardID);
    // tasksService.deleteTasksOnBoard(await tasksOnBoard);
    reply.code(204);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardID} doesn't exist` });
  }
};

/**
 * Handles incoming request to update board
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const update = async (
  request: FastifyRequest<{ Params: BoardParams; Body: BoardBody }>,
  reply: FastifyReply
) => {
  const boardID = request.params.boardId;
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
