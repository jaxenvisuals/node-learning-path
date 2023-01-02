const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const productJsonPath = path.join(rootDir, "data", "products.json");

module.exports.Product = class {
  constructor({ title }) {
    this.title = title;
  }

  get() {
    return this;
  }

  add(cb) {
    let products = [];

    fs.readFile(productJsonPath, (error, data) => {
      if (data) {
        products = JSON.parse(data);
      }

      products.push(this);

      fs.writeFile(productJsonPath, JSON.stringify(products), () => {
        cb();
      });
    });
  }

  static getAll(cb) {
    fs.readFile(productJsonPath, (error, data) => {
      if (!data) return cb([]);

      const contents = JSON.parse(Buffer.concat([data]).toString());

      cb(contents || []);
    });
  }
};
