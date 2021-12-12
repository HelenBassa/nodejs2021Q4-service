import Column from '../columns/column.model';

export type BoardParams = {
  id: string;
};

export type BoardBody = {
  title: string;
  columns: Column[];
};
