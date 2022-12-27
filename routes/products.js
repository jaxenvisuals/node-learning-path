const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "products.html"));
});

router.get("/add-product", (req, res, next) => {
  res
    .status(200)
    .sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/", (req, res, next) => {
  console.log(req.body); // parsed body

  res.setHeader("Location", "/products");
  res.status(302).send();
});

module.exports = router;
