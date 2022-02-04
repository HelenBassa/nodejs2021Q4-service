import { v4 as uuidv4 } from 'uuid';
import Column from './columns.model';

class Board {
  id: string;

  title: string;

  columns: Column[];

  /**
   * Creates an instance of board.
   * @param title - title of board.
   * @param columns - columns of board.
   */
  constructor(title: string, columns: Column[], id = uuidv4()) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export { Board };
