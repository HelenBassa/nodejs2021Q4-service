import { v4 } from 'uuid';

class Column {
  id: string;
  title: string;
  order: string;

  /**
   * Creates an instance of column.
   * @param title - title of column.
   * @param order - order of column.
   */
  constructor(title: string, order: string) {
    this.id = v4();
    this.title = title;
    this.order = order;
  }
}

export default Column;
