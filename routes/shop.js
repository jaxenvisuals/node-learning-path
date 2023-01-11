const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/product-detail/:productId", shopController.getProductDetail);

router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

router.post("/add-to-cart/:productId", shopController.addItemToCart);

router.post(
  "/cart-delete-item/:productId",
  shopController.deleteItemFromCart
);

module.exports = router;
