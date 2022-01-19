import { FastifyReply, FastifyRequest } from 'fastify';
import { validate } from 'uuid';

import { BoardBody, BoardParams } from './board.types';
import boardsRepo from './board.memory.repository';

/**
 * Handles incoming request to get all boards
 * @param _ - incoming request object, not used
 * @param reply - outcoming reply object
 */
const getAll = async (reply: FastifyReply) => {
  const boards = await boardsRepo.getAll();
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
  const { boardId } = request.params;

  if (!validate(boardId)) {
    reply.code(400).send({ message: `This ID: ${boardId} isn't UUID` });
  }

  const board = await boardsRepo.getOne(boardId);

  if (board) {
    reply.code(200).send(board);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardId} doesn't exist` });
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
  const createdBoard = await boardsRepo.create(data);
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
  const { boardId } = request.params;

  if (!validate(boardId)) {
    reply.code(400).send({ message: `This ID: ${boardId} isn't UUID` });
  }

  const deletedBoard = await boardsRepo.deleteOne(boardId);

  if (deletedBoard) {
    reply.code(204);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardId} doesn't exist` });
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
  const { boardId } = request.params;
  const data = request.body;

  if (!validate(boardId)) {
    reply.code(400).send({ message: `This ID: ${boardId} isn't UUID` });
  }

  const updatedBoard = await boardsRepo.update(boardId, data);

  if (updatedBoard) {
    reply.code(200).send(updatedBoard);
  } else {
    reply
      .code(404)
      .send({ message: `Board with ID: ${boardId} doesn't exist` });
  }
};

export default { getAll, getOne, create, deleteOne, update };
