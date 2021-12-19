import { FastifyReply, FastifyRequest } from 'fastify';
import { validate } from 'uuid';
import { BoardParams } from '../boards/board.types';
import tasksRepo from './task.memory.repository';
import Task from './task.model';
import { TaskBody, TaskParams } from './task.types';

const getAllByBoardID = (
  request: FastifyRequest<{ Params: BoardParams }>,
  reply: FastifyReply
) => {
  const boardID = request.params.id;

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const tasks = tasksRepo.getAllByBoardID(boardID);
  reply.code(200).send(tasks);
};

const getAllTasksByBoardID = (boardID: string) =>
  tasksRepo.getAllByBoardID(boardID);

const getAllTasksByUserID = (userID: string) =>
  tasksRepo.getAllByUserID(userID);

const getOne = (
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply
) => {
  const taskID = request.params.id;
  const boardID = request.params.boardId;

  if (!validate(taskID)) {
    reply.code(400).send({ message: `This ID: ${taskID} isn't UUID` });
  }

  if (!validate(boardID)) {
    reply.code(400).send({ message: `This ID: ${boardID} isn't UUID` });
  }

  const task = tasksRepo.getOne(taskID, boardID);

  if (task) {
    reply.code(200).send(task);
  } else {
    reply.code(404).send({ message: `Task with ID: ${taskID} doesn't exist` });
  }
};

const create = (
  request: FastifyRequest<{ Params: BoardParams; Body: TaskBody }>,
  reply: FastifyReply
) => {
  const { title, order, description, userId, columnId } = request.body;
  const boardId = request.params.id;
  if (userId) {
    const createdTask = tasksRepo.create(
      title,
      order,
      description,
      userId,
      columnId,
      boardId
    );

    if (createdTask) {
      reply.code(201).send(createdTask);
    }
  }
};

const deleteOne = (
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply
) => {
  const taskID = request.params.id;

  if (!validate(taskID)) {
    reply.code(400).send({ message: `This ID: ${taskID} isn't UUID` });
  }

  const deletedTask = tasksRepo.deleteOne(taskID);

  if (deletedTask) {
    reply.code(204);
  } else {
    reply.code(404).send({ message: `Task with ID: ${taskID} doesn't exist` });
  }
};

const deleteTasksOnBoard = (tasksOnBoard: Task[] | null) => {
  if (tasksOnBoard) {
    tasksOnBoard.forEach((taskOnBoard) => {
      tasksRepo.deleteOne(taskOnBoard.id);
    });
  }
};

const removeTasksFromUser = (userTasks: Task[] | null) => {
  if (userTasks) {
    userTasks.forEach((userTask) => {
      tasksRepo.update(userTask.id, { ...userTask, userId: null });
    });
  }
};

const update = (
  request: FastifyRequest<{ Params: TaskParams; Body: TaskBody }>,
  reply: FastifyReply
) => {
  const taskID = request.params.id;
  const data = request.body;

  if (!validate(taskID)) {
    reply.code(400).send({ message: `This ID: ${taskID} isn't UUID` });
  }

  const updatedTask = tasksRepo.update(taskID, data);

  if (updatedTask) {
    reply.code(200).send(updatedTask);
  } else {
    reply.code(404).send({ message: `Task with ID: ${taskID} doesn't exist` });
  }
};

export default {
  getAllByBoardID,
  getAllTasksByBoardID,
  getAllTasksByUserID,
  getOne,
  create,
  deleteOne,
  deleteTasksOnBoard,
  removeTasksFromUser,
  update,
};
