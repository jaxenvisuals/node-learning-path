const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor({ title, imageUrl, description, price, id }) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id || null;
  }

  save(cb) {
    getProductsFromFile((products) => {
      if (this.id) {
        cb();
        return;
      }

      const id = Math.random().toString();

      products.push({ ...this, id });
      this.writeProducts(products, (err) => {
        if (err) {
          cb();

          return;
        }

        this.id = id;
        cb();
      });
    });
  }

  update(cb) {
    getProductsFromFile((products) => {
      const updatedProducts = products.map((prod) =>
        prod.id === this.id ? this : prod
      );

      Product.writeProducts(updatedProducts, (err) => {
        if (err) {
          cb();

          return;
        }

        cb();
      });
    });
  }

  get get() {
    return this;
  }

  static writeProducts(products, cb) {
    fs.writeFile(p, JSON.stringify(products), cb);
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProduct({ id, cb }) {
    getProductsFromFile((allProducts) => {
      const product = allProducts.find((prod) => prod.id === id);

      cb(product);
    });
  }
};
