const { validate } = require('uuid');
const tasksRepo = require('./task.memory.repository');

const getAll = ({ reply }) => {
  const tasks = tasksRepo.getAll();
  reply.code(200).send(tasks);
};

const getOne = ({ request, reply }) => {
  const taskID = request.params.taskId;

  if (!validate(taskID)) {
    reply.code(400).send({ message: `This ID: ${taskID} isn't UUID` });
  }

  const task = tasksRepo.getOne(taskID);

  if (task) {
    reply.code(200).send(task);
  } else {
    reply.code(404).send({ message: `Task with ID: ${taskID} doesn't exist` });
  }
};

const create = ({ request, reply }) => {
  const data = request.body;
  const createdTask = tasksRepo.create(data);
  reply.code(201).send(createdTask);
};

const deleteOne = ({ request, reply }) => {
  const taskID = request.params.taskId;

  if (!validate(taskID)) {
    reply.code(400).send({ message: `This ID: ${taskID} isn't UUID` });
  }

  const deletedTask = tasksRepo.deleteOne(taskID);

  if (deletedTask) {
    reply.code(204);
  } else {
    reply.code(404).send({ message: `Task with ID: ${taskID} doesn't exist` });
  }
};

const update = ({ request, reply }) => {
  const taskID = request.params.taskId;
  const data = request.body;

  if (!validate(taskID)) {
    reply.code(400).send({ message: `This ID: ${taskID} isn't UUID` });
  }

  const updatedTask = tasksRepo.update({ taskID, data });

  if (updatedTask) {
    reply.code(200).send(updatedTask);
  } else {
    reply.code(404).send({ message: `Task with ID: ${taskID} doesn't exist` });
  }
};

module.exports = { getAll, getOne, create, deleteOne, update };
