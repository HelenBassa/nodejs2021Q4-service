import { getRepository } from 'typeorm';

import { UserBody } from './user.types';
import User from './user.model';
import { User as UserEntity } from '../../entity/User';
import loginService from '../login/login.service';

/**
 * Returns all users from Postgres DB.
 *
 * @returns array of all users
 */
const getAll = async (): Promise<User[]> => {
  const userRepository = getRepository(UserEntity);
  const users = await userRepository.find();
  return users;
};

/**
 * Returns user by id from Postgres DB.
 * @param userId - uuid of user
 * @returns object of user or undefined if not found
 */
const getOne = async (userId: string): Promise<User | undefined> => {
  const user = await getRepository(UserEntity).findOne(userId);
  return user;
};

/**
 * Creates user in Postgres DB.
 * @param data - object with name, login and password fields
 * @returns object of new user with id, name and login fields
 */
type UserWithoutPass = Omit<User, 'password'>;

const create = async (data: UserBody): Promise<UserWithoutPass | false> => {
  const { name, login, password } = data;
  if (password) {
    const hashedPassword = await loginService.hashPassword(password);
    const user = new User(name, login, hashedPassword);

    const userRepository = getRepository(UserEntity);

    const userNew = userRepository.create(user);
    await userRepository.save(userNew);
    return User.toResponse(userNew);
  }
  return false;
};

/**
 * Deletes user by id from Postgres DB.
 * @param userId - uuid of user
 * @returns user if user was found and deleted or null if not
 */
const deleteOne = async (userId: string): Promise<User | null> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(userId);
  const results = await userRepository.delete(userId);

  if (results && user) {
    return user;
  }
  return null;
};

/**
 * Updates user by id in Postgres DB.
 * @param userId - uuid of user
 * @param data - object with name, login, password fields
 * @returns object of updated user with id, name and login fields
 */
const update = async (userId: string, data: UserBody): Promise<User | null> => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(userId);

  if (user) {
    const newPassword = '' + data.password;
    const hashedPassword = await loginService.hashPassword(newPassword);
    const newUser = {
      ...data,
      password: hashedPassword,
    };

    userRepository.merge(user, newUser);
    const results = await userRepository.save(user);
    return results;
  }
  return null;
};

const getUserByProps = async (login: string) => {
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne({ where: { login } });
  if (!user) {
    return null;
  }
  return user;
};

export default { getAll, getOne, create, deleteOne, update, getUserByProps };
