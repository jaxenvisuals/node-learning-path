const products = [];

module.exports.Product = class {
  constructor({ title }) {
    this.title = title;
  }

  get() {
    return this;
  }

  add() {
    products.push(this);
  }

  static getAll() {
    return products;
  }
};
