import { v4 } from 'uuid';

class Task {
  id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
  constructor(
    title: string,
    order: string,
    description: string,
    userId: string,
    boardId: string,
    columnId: string
  ) {
    this.id = v4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
