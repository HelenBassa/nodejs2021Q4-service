import Task from './task.model';
import { TaskBody } from './task.types';

let tasksRepo: Task[] = [];

const getAll = () => tasksRepo;

const getOne = (taskID: string, boardID: string) =>
  tasksRepo.find((task) => task.id === taskID && task.boardId === boardID);

const getAllByBoardID = (boardID: string) =>
  tasksRepo.filter((task) => task.boardId === boardID);

const getAllByUserID = (userID: string) =>
  tasksRepo.filter((task) => task.userId === userID);

const create = (
  title: string,
  order: string,
  description: string,
  userId: string,
  columnId: string,
  boardId: string
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

const deleteOne = (taskID: string) => {
  const deletedTask = tasksRepo.find((task) => task.id === taskID);
  if (deletedTask) {
    tasksRepo = tasksRepo.filter((task) => task.id !== taskID);
    return deletedTask;
  }
  return null;
};

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
