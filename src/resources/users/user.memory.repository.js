const User = require('./user.model');
const tasksService = require('../tasks/task.service');

let usersRepo = [];

const getAll = () => usersRepo.map((user) => User.toResponse(user));

const getOne = (userID) =>
  User.toResponse(usersRepo.find((user) => user.id === userID));

const create = (data) => {
  const { name, login, password } = data;
  const createdUser = new User({ name, login, password });
  usersRepo = [...usersRepo, createdUser];
  return User.toResponse(createdUser);
};

const deleteOne = (userID) => {
  const deletedUser = usersRepo.find((user) => user.id === userID);
  if (deletedUser) {
    const userTasks = tasksService.getAllByUserID(userID);
    tasksService.removeTasksFromUser(userTasks);
    usersRepo = usersRepo.filter((user) => user.id !== userID);
    return deletedUser;
  }
  return null;
};

const update = ({ userID, data }) => {
  const { name, login, password } = data;
  const id = userID;
  const updatedUser = usersRepo.find((user) => user.id === userID);
  if (updatedUser) {
    usersRepo = usersRepo.map((user) =>
      user.id === id ? { id, name, login, password } : user
    );
  }

  return User.toResponse(usersRepo.find((user) => user.id === id));
};

module.exports = { getAll, getOne, create, deleteOne, update };
