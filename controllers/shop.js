const { get404 } = require("./error");

const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
      userScope: {
        addToCart: true,
      },
    });
  });
};

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId;

  Product.findProduct({
    id: productId,
    cb: (productData) => {
      if (!productData) return get404(req, res, next);

      const prod = new Product(productData);

      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path: "/products",
        product: prod.get,
        userScope: {
          addToCart: true,
        },
      });
    },
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      userScope: {
        addToCart: true,
      },
    });
  });
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
