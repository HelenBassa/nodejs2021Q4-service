import Column from '../columns/column.model';

export type BoardParams = {
  boardId: string;
};

export type BoardBody = {
  title: string;
  columns: Column[];
};
