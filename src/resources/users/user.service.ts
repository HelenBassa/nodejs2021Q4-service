import { FastifyReply, FastifyRequest } from 'fastify';
import { validate } from 'uuid';

import { UserBody, UserParams } from './user.types';
import usersRepo from './user.memory.repository';
import { HTTP_CODES } from '../../constants';

/**
 * Handles incoming request to get all users
 * @param _ - incoming request object, not used
 * @param reply - outcoming reply object
 */
const getAll = async (reply: FastifyReply) => {
  const users = await usersRepo.getAll();
  reply.code(HTTP_CODES.OK).send(users);
};

/**
 * Handles incoming request to get user by id
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const getOne = async (
  request: FastifyRequest<{ Params: UserParams }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;

  if (!validate(userId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${userId} isn't UUID` });
  }

  const user = await usersRepo.getOne(userId);

  if (user) {
    reply.code(HTTP_CODES.OK).send(user);
  } else {
    reply
      .code(HTTP_CODES.NOT_FOUND)
      .send({ message: `User with ID: ${userId} doesn't exist` });
  }
};

/**
 * Handles incoming request to create new user
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const create = async (
  request: FastifyRequest<{ Body: UserBody }>,
  reply: FastifyReply
) => {
  const data = request.body;
  const createdUser = await usersRepo.create(data);
  reply.code(HTTP_CODES.CREATED).send(createdUser);
};

/**
 * Handles incoming request to delete user
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const deleteOne = async (
  request: FastifyRequest<{ Params: UserParams }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;

  if (!validate(userId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${userId} isn't UUID` });
  }

  const deletedUser = await usersRepo.deleteOne(userId);

  if (deletedUser) {
    reply.code(HTTP_CODES.NO_CONTENT);
  } else {
    reply
      .code(HTTP_CODES.NOT_FOUND)
      .send({ message: `User with ID: ${userId} doesn't exist` });
  }
};

/**
 * Handles incoming request to update user
 * @param request - incoming request object
 * @param reply - outcoming reply object
 */
const update = async (
  request: FastifyRequest<{ Params: UserParams; Body: UserBody }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;
  const data = request.body;

  if (!validate(userId)) {
    reply
      .code(HTTP_CODES.BAD_REQUEST)
      .send({ message: `This ID: ${userId} isn't UUID` });
  }

  const updatedUser = await usersRepo.update(userId, data);

  if (updatedUser) {
    reply.code(HTTP_CODES.OK).send(updatedUser);
  } else {
    reply
      .code(HTTP_CODES.NOT_FOUND)
      .send({ message: `User with ID: ${userId} doesn't exist` });
  }
};

export default { getAll, getOne, create, deleteOne, update };
