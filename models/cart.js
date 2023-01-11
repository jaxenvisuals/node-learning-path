const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

const getCartFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb(null);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  static addItem(item, cb) {
    let cart = {
      items: [],
      total: 0,
      id: Math.random().toString(),
    };

    getCartFromFile((existingCart) => {
      if (existingCart) {
        cart = existingCart;
      }

      const itemIdx = cart.items.findIndex(
        (itm) => itm.productData.id === item.id
      );

      if (itemIdx >= 0) {
        cart.items[itemIdx].quantity++;
      } else {
        cart.items.push({
          productData: item,
          quantity: 1,
        });
      }

      cart.total = +cart.total + +item.price;

      this.writeCart(cart, (err) => {
        if (err) {
          cb();
          return;
        }

        cb();
      });
    });
  }

  static deleteItem(id, cb) {
    getCartFromFile((existingCart) => {
      const cart = existingCart;
      let item = {};

      const itemIdx = cart.items.findIndex(
        (itm) => itm.productData.id === id
      );

      if (itemIdx >= 0) {
        item = cart.items[itemIdx];

        item.quantity--;

        if (item.quantity < 1) {
          cart.items.splice(itemIdx, 1);
        }
      }

      cart.total = +cart.total - +item.productData.price;

      this.writeCart(cart, (err) => {
        if (err) {
          cb();
          return;
        }

        cb();
      });
    });
  }

  static writeCart(cart, cb) {
    fs.writeFile(p, JSON.stringify(cart), cb);
  }

  static fetchCart(cb) {
    getCartFromFile(cb);
  }
};
