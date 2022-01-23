import { FastifyReply, FastifyRequest } from 'fastify';
import { validate } from 'uuid';

import { BoardParams } from '../boards/board.types';
import { TaskBody, TaskParams } from './task.types';
import tasksRepo from './task.memory.repository';
import { HTTP_CODES } from '../../constants';

/**
 * Handles incoming request to get all tasks at the board.
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const getAllByboardId = async (
  request: FastifyRequest<{ Params: BoardParams }>,
  reply: FastifyReply
) => {
  const { boardId } = request.params;

  if (!validate(boardId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${boardId} isn't UUID` });
  }

  const tasks = await tasksRepo.getAll(boardId);
  reply.code(HTTP_CODES.OK).send(tasks);
};

/**
 * Handles incoming request to get task by id at the board.
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const getOne = async (
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply
) => {
  const { taskId } = request.params;
  const { boardId } = request.params;

  if (!validate(taskId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${taskId} isn't UUID` });
  }

  if (!validate(boardId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${boardId} isn't UUID` });
  }

  const task = await tasksRepo.getOne(taskId);

  if (task) {
    reply.code(HTTP_CODES.OK).send(task);
  } else {
    reply
      .code(HTTP_CODES.NOT_FOUND)
      .send({ message: `Task with ID: ${taskId} doesn't exist` });
  }
};

/**
 * Handles incoming request to create new task at the board.
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const create = async (
  request: FastifyRequest<{ Params: BoardParams; Body: TaskBody }>,
  reply: FastifyReply
) => {
  const { title, order, description, userId, columnId } = request.body;
  const { boardId } = request.params;
  const createdTask = await tasksRepo.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  reply.code(HTTP_CODES.CREATED).send(createdTask);
};

/**
 * Handles incoming request to delete task at the board.
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const deleteOne = async (
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply
) => {
  const { taskId } = request.params;

  if (!validate(taskId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${taskId} isn't UUID` });
  }

  const deletedTask = await tasksRepo.deleteOne(taskId);

  if (deletedTask) {
    reply.code(HTTP_CODES.NO_CONTENT);
  } else {
    reply
      .code(HTTP_CODES.NOT_FOUND)
      .send({ message: `Task with ID: ${taskId} doesn't exist` });
  }
};

/**
 * Handles deleting all the task at the board.
 * @param tasksOnBoard - all tasks at the board.
 */
const deleteTasksOnBoard = (boardId: string): Promise<void> =>
  tasksRepo.deleteTasksByboardId(boardId);

/**
 * Handles removing all the task of the user.
 * @param userTasks - all tasks of the user.
 */
const removeTasksFromUser = (userId: string): Promise<void> =>
  tasksRepo.unassignUser(userId);

/**
 * Handles incoming request to update task at the board.
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const update = async (
  request: FastifyRequest<{ Params: TaskParams; Body: TaskBody }>,
  reply: FastifyReply
) => {
  const { taskId } = request.params;
  const data = request.body;

  if (!validate(taskId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${taskId} isn't UUID` });
  }

  const updatedTask = await tasksRepo.update(taskId, data);

  if (updatedTask) {
    reply.code(HTTP_CODES.OK).send(updatedTask);
  } else {
    reply
      .code(HTTP_CODES.NOT_FOUND)
      .send({ message: `Task with ID: ${taskId} doesn't exist` });
  }
};

export default {
  getAllByboardId,
  getOne,
  create,
  deleteOne,
  deleteTasksOnBoard,
  removeTasksFromUser,
  update,
};
