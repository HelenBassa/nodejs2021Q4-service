const { v4 } = require('uuid');

class Board {
  constructor({ title, columns } = {}) {
    this.id = v4();
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
