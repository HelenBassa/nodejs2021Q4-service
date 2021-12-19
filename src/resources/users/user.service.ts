import { FastifyReply, FastifyRequest } from 'fastify';
import { validate } from 'uuid';
import usersRepo from './user.memory.repository';
import { UserBody, UserParams } from './user.types';

/**
 * Handles incoming request to get all users
 * @param _ - incoming request object, not used
 * @param reply - outcoming reply object
 */
const getAll = async (reply: FastifyReply) => {
  const users = usersRepo.getAll();
  reply.code(200).send(users);
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
  const userID = request.params.userId;

  if (!validate(userID)) {
    reply.code(400).send({ message: `This ID: ${userID} isn't UUID` });
  }

  const user = usersRepo.getOne(userID);

  if (user) {
    reply.code(200).send(user);
  } else {
    reply.code(404).send({ message: `User with ID: ${userID} doesn't exist` });
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
  const createdUser = usersRepo.create(data);
  reply.code(201).send(createdUser);
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
  const userID = request.params.userId;

  if (!validate(userID)) {
    reply.code(400).send({ message: `This ID: ${userID} isn't UUID` });
  }

  const deletedUser = usersRepo.deleteOne(userID);

  if (deletedUser) {
    reply.code(204);
  } else {
    reply.code(404).send({ message: `User with ID: ${userID} doesn't exist` });
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
  const userID = request.params.userId;
  const data = request.body;

  if (!validate(userID)) {
    reply.code(400).send({ message: `This ID: ${userID} isn't UUID` });
  }

  const updatedUser = usersRepo.update(userID, data);

  if (updatedUser) {
    reply.code(200).send(updatedUser);
  } else {
    reply.code(404).send({ message: `User with ID: ${userID} doesn't exist` });
  }
};

export default { getAll, getOne, create, deleteOne, update };
