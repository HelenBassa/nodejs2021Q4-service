export type TaskParams = {
  taskId: string;
  boardId: string;
};

export type TaskBody = {
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
};
