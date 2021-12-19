import User from './user.model';
import tasksService from '../tasks/task.service';
import { UserBody } from './user.types';

let usersRepo: User[] = [];

/**
 * Returns all users from in-memory DB.
 *
 * @returns array of all users
 */
const getAll = () => usersRepo.map((user) => User.toResponse(user));

/**
 * Returns user by id from in-memory DB.
 * @param userID - uuid of user
 * @returns object of user or undefined if not found
 */
const getOne = (userID: string) =>
  User.toResponse(usersRepo.find((user) => user.id === userID));

/**
 * Creates user in in-memory DB.
 * @param data - object with name, login and password fields
 * @returns object of new user with id, name and login fields
 */
const create = (data: UserBody) => {
  const { name, login, password } = data;
  const createdUser = new User(name, login, password);
  usersRepo = [...usersRepo, createdUser];
  return User.toResponse(createdUser);
};

/**
 * Deletes user by id from in-memory DB.
 * @param userID - uuid of user
 * @returns user if user was found and deleted or null if not
 */
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

/**
 * Updates user by id in in-memory DB.
 * @param userID - uuid of user
 * @param data - object with name, login, password fields
 * @returns object of updated user with id, name and login fields
 */
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
