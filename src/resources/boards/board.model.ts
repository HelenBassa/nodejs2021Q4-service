import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/column.model';

class Board {
  id: string;

  title: string;

  columns: Column[];

  /**
   * Creates an instance of board.
   * @param title - title of board.
   * @param columns - columns of board.
   */
  constructor(id = uuidv4(), title: string, columns: Column[]) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
