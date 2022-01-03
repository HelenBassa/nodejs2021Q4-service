import Task from './task.model';
import { TaskBody } from './task.types';

let tasksRepo: Task[] = [];

/**
 * Returns all tasks from in-memory DB.
 * @returns array of all tasks.
 */
const getAll = () => tasksRepo;

/**
 * Returns the task by id at the board from in-memory DB.
 * @param taskID - uuid of task.
 * @param boardID - uuid of board.
 * @returns object of task or undefined if not found.
 */
const getOne = (taskID: string, boardID: string) =>
  tasksRepo.find((task) => task.id === taskID && task.boardId === boardID);

/**
 * Returns all tasks at the board from in-memory DB.
 * @param boardID - uuid of the board.
 * @returns array of all tasks at the board.
 */
const getAllByBoardID = (boardID: string) =>
  tasksRepo.filter((task) => task.boardId === boardID);

/**
 * Returns all tasks of the user from in-memory DB.
 * @param userID - uuid of the user.
 * @returns array of all tasks of the user.
 */
const getAllByUserID = (userID: string) =>
  tasksRepo.filter((task) => task.userId === userID);

/**
 * Creates task in in-memory DB.
 * @param title - title of the task.
 * @param order - order of the task.
 * @param description - description of the task.
 * @param userId - uuid of the user.
 * @param boardId - uuid of the board.
 * @param columnId - uuid of the column.
 * @returns object of new task.
 */
const create = (
  title: string,
  order: number,
  description: string,
  userId: string | null,
  boardId: string | null,
  columnId: string | null
) => {
  const createdTask = new Task(
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
  tasksRepo = [...tasksRepo, createdTask];
  return createdTask;
};

/**
 * Deletes task by id from in-memory DB.
 * @param taskID - uuid of task.
 * @returns task if task was found and deleted or null if not.
 */
const deleteOne = (taskID: string) => {
  const deletedTask = tasksRepo.find((task) => task.id === taskID);
  if (deletedTask) {
    tasksRepo = tasksRepo.filter((task) => task.id !== taskID);
    return deletedTask;
  }
  return null;
};

/**
 * Updates task by id in in-memory DB.
 * @param taskID - uuid of task.
 * @param data - object with title, order, description, userId, boardId, columnId fields.
 * @returns object of updated task.
 */
const update = (taskID: string, data: TaskBody) => {
  const { title, order, description, userId, boardId, columnId } = data;
  const id = taskID;
  const updatedTask = tasksRepo.find((task) => task.id === taskID);
  if (updatedTask) {
    tasksRepo = tasksRepo.map((task) =>
      task.id === id
        ? { id, title, order, description, userId, boardId, columnId }
        : task
    );
  }

  return tasksRepo.find((task) => task.id === id);
};

export default {
  getAll,
  getOne,
  getAllByBoardID,
  getAllByUserID,
  create,
  deleteOne,
  update,
};
