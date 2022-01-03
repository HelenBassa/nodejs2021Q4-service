export type TaskParams = {
  taskId: string;
  boardId: string;
};

export type TaskBody = {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
};
