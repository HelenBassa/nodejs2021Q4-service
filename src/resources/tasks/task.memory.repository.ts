import { getRepository } from 'typeorm';

import { TaskBody } from './task.types';
import { Task as TaskEntity } from '../../entity/Task';

/**
 * Returns all tasks from Postgres DB.
 * @param boardId - uuid of board.
 * @returns array of all tasks.
 */
const getAll = async (boardId: string): Promise<TaskEntity[]> => {
  const taskRepository = getRepository(TaskEntity);
  const tasks = await taskRepository.find({ where: { boardId } });
  return tasks;
};

/**
 * Returns the task by id at the board from Postgres DB.
 * @param taskId - uuid of task.
 * @param boardId - uuid of board.
 * @returns object of task or undefined if not found.
 */
const getOne = async (taskId: string): Promise<TaskEntity | undefined> => {
  const tasksRepository = getRepository(TaskEntity);
  const task = await tasksRepository.findOne(taskId);
  return task;
};

/**
 * Creates task in Postgres DB.
 * @param title - title of the task.
 * @param order - order of the task.
 * @param description - description of the task.
 * @param userId - uuid of the user.
 * @param boardId - uuid of the board.
 * @param columnId - uuid of the column.
 * @returns object of new task.
 */
const create = async (data: TaskBody): Promise<TaskEntity> => {
  const tasksRepository = getRepository(TaskEntity);
  const task: TaskEntity = new TaskEntity();
  task.title = data.title;
  task.order = data.order;
  task.description = data.description;
  if (data.userId) {
    task.userId = data.userId;
  }

  if (data.boardId) {
    task.boardId = data.boardId;
  }

  if (data.columnId) {
    task.columnId = data.columnId;
  }

  await tasksRepository.save(task);
  return task;
};

/**
 * Deletes task by id from Postgres DB.
 * @param taskId - uuid of task.
 * @returns task if task was found and deleted or null if not.
 */
const deleteOne = async (taskId: string): Promise<TaskEntity | null> => {
  const tasksRepository = getRepository(TaskEntity);
  const task = await tasksRepository.findOne(taskId);
  const results = await tasksRepository.delete(taskId);

  if (results && task) {
    return task;
  }
  return null;
};

/**
 * Updates task by id in Postgres DB.
 * @param taskId - uuid of task.
 * @param data - object with title, order, description, userId, boardId, columnId fields.
 * @returns object of updated task.
 */
const update = async (
  taskId: string,
  data: TaskBody
): Promise<TaskEntity | null | undefined> => {
  const tasksRepository = getRepository(TaskEntity);
  const task = await tasksRepository.findOne(taskId);

  if (task) {
    tasksRepository.merge(task, data);
    const results = await tasksRepository.save(task);
    return results;
  }
  return null;
};

/**
 * Deletes task by boardId from Postgres DB.
 * @param boardId board id for delete
 * @returns void
 */
const deleteTasksByboardId = async (boardId: string): Promise<void> => {
  const tasksRepository = getRepository(TaskEntity);
  const tasks = await tasksRepository.find({ where: { boardId } });
  const tasksIds: string[] = tasks.map((task: TaskEntity) => task.id);

  if (tasksIds && tasksIds.length > 0) {
    await tasksRepository.delete(tasksIds);
  }
};

/**
 * Unassign user by userId
 * @param userId userId for unassign
 * @returns void
 */
const unassignUser = async (userId: string): Promise<void> => {
  await getRepository(TaskEntity)
    .createQueryBuilder()
    .update()
    .set({ userId: null as unknown as string })
    .where(`userId = :userId`, { userId })
    .execute();
};

export default {
  getAll,
  getOne,
  deleteTasksByboardId,
  unassignUser,
  create,
  deleteOne,
  update,
};
