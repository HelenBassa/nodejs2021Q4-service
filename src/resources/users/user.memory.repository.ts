import User from './user.model';
import tasksService from '../tasks/task.service';
import { UserBody } from './user.types';

let usersRepo: User[] = [];

const getAll = () => usersRepo.map((user) => User.toResponse(user));

const getOne = (userID: string) =>
  User.toResponse(usersRepo.find((user) => user.id === userID));

const create = (data: UserBody) => {
  const { name, login, password } = data;
  const createdUser = new User(name, login, password);
  usersRepo = [...usersRepo, createdUser];
  return User.toResponse(createdUser);
};

const deleteOne = (userID: string) => {
  const deletedUser = usersRepo.find((user) => user.id === userID);
  if (deletedUser) {
    // const userTasks = await tasksService.getAllTasksByUserID(userID);
    // tasksService.removeTasksFromUser(userTasks);
    usersRepo = usersRepo.filter((user) => user.id !== userID);
    return deletedUser;
  }
  return null;
};

const update = (userID: string, data: UserBody) => {
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

export default { getAll, getOne, create, deleteOne, update };
