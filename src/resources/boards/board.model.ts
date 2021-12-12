import { v4 } from 'uuid';
import Column from '../columns/column.model';

class Board {
  id: string;
  title: string;
  columns: Column[];

  constructor(title: string, columns: Column[]) {
    this.id = v4();
    this.title = title;
    this.columns = columns;
  }
}

export default Board;