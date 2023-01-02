const express = require("express");

const products = require("./products");

const router = express.Router();

const productController = require("../controllers/productController");
const errorController = require("../controllers/errors");

router.get("/", productController.productsShop);

router.use("/products", products);

// Catch all unresolved urls
router.use(errorController.notFound);

module.exports = router;
