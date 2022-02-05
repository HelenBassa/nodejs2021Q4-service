import { v4 as uuidv4 } from 'uuid';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  /**
   * Creates an instance of task.
   * @param title - title of the task.
   * @param order - order of the task.
   * @param description - description of the task.
   * @param userId - uuid of the user.
   * @param boardId - uuid of the board.
   * @param columnId - uuid of the column.
   */
  constructor(
    title: string,
    order: number,
    description: string,
    userId: string | null,
    boardId: string | null,
    columnId: string | null,
    id = uuidv4(),
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export { Task };
