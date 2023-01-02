const express = require("express");

const products = require("./products");

const router = express.Router();

const productModel = require("../model/product");

router.get("/", (req, res, next) => {
  // Home
  res.status(200).render("shop", {
    docTitle: "Shop",
    products: productModel.Product.getAll(),
    url: "/",
    useProductStyle: true,
    pageIsShop: true,
  });
});

router.use("/products", products);

// Catch all unresolved urls
router.use((req, res, next) => {
  // 404 page
  res.status(404).render("404", {
    layout: "404-layout",
    docTitle: "Not Found",
    url: "/404",
  });
});

module.exports = router;
