const { v4 } = require('uuid');

class Column {
  constructor({ title, order } = {}) {
    this.id = v4();
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
