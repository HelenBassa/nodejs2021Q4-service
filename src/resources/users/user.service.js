const { validate } = require('uuid');
const usersRepo = require('./user.memory.repository');

const getAll = ({ reply }) => {
  const users = usersRepo.getAll();
  reply.code(200).send(users);
};

const getOne = ({ request, reply }) => {
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

const create = ({ request, reply }) => {
  const data = request.body;
  const createdUser = usersRepo.create(data);
  reply.code(201).send(createdUser);
};

const deleteOne = ({ request, reply }) => {
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

const update = ({ request, reply }) => {
  const userID = request.params.userId;
  const data = request.body;

  if (!validate(userID)) {
    reply.code(400).send({ message: `This ID: ${userID} isn't UUID` });
  }

  const updatedUser = usersRepo.update({ userID, data });

  if (updatedUser) {
    reply.code(200).send(updatedUser);
  } else {
    reply.code(404).send({ message: `User with ID: ${userID} doesn't exist` });
  }
};

module.exports = { getAll, getOne, create, deleteOne, update };
