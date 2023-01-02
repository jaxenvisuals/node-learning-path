const productModel = require("../models/product");

module.exports.productsShop = (req, res, next) => {
  // Home
  res.status(200).render("shop", {
    docTitle: "Shop",
    products: productModel.Product.getAll(),
    url: "/",
    useProductStyle: true,
    pageIsShop: true,
  });
};

module.exports.addProductForm = (req, res, next) => {
  res.status(200).render("add-product", {
    docTitle: "Add Product",
    url: "/products/add-product",
    useProductStyle: true,
    useFormsStyle: true,
    pageIsAddProduct: true,
  });
};

module.exports.addProduct = (req, res, next) => {
  const product = new productModel.Product({ title: req.body.title });

  product.add();

  res.setHeader("Location", "/");
  res.status(302).send();
};
