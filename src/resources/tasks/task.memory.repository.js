const Task = require('./task.model');

let tasksRepo = [];

const getAll = () => tasksRepo;

const getOne = (taskID) => tasksRepo.find((task) => task.id === taskID);

const create = (data) => {
  const { title, order, description, userId, boardId, columnId } = data;
  const createdTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  tasksRepo = [...tasksRepo, createdTask];
  return createdTask;
};

const deleteOne = (taskID) => {
  const deletedTask = tasksRepo.find((task) => task.id === taskID);
  if (deletedTask) {
    tasksRepo = tasksRepo.filter((task) => task.id !== taskID);
    return deletedTask;
  }
  return null;
};

const update = ({ taskID, data }) => {
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

module.exports = { getAll, getOne, create, deleteOne, update };
