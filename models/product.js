const db = require("../util/database");

module.exports = class Product {
  constructor({ title, imageUrl, description, price, id }) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id || null;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  update() {}

  get get() {
    return this;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findProduct({ id }) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [
      id,
    ]);
  }
};
