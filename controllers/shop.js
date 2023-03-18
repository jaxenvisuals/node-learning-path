const { get404 } = require("./error");

const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, columns]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
        userScope: {
          addToCart: true,
        },
      });
    })
    .catch((err) => console.log("Error fetching products", err));
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;

  Product.findProduct({
    id: productId,
  })
    .then(([products]) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path: "/products",
        product: products[0],
        userScope: {
          addToCart: true,
        },
      });
    })
    .catch((err) => console.log("error finding product", err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, columns]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
        userScope: {
          addToCart: true,
        },
      });
    })
    .catch((err) => console.log("Error fetching products", err));
};

exports.getCart = (req, res, next) => {
  Cart.fetchCart((cart) => {
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      items: (cart && cart.items) || null,
      total: (cart && cart.total) || null,
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.addItemToCart = (req, res, next) => {
  const productId = req.params.productId;

  Product.findProduct({
    id: productId,
    cb: (productData) => {
      Cart.addItem(productData, () => {
        res.redirect("/");
      });
    },
  });
};

exports.deleteItemFromCart = (req, res, next) => {
  const productId = req.params.productId;

  Cart.deleteItem(productId, () => {
    res.redirect("/cart");
  });
};
