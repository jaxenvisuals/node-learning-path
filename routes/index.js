const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const products = require("./products");

const router = express.Router();

router.get("/", (req, res, next) => {
  // Home
  res.status(200).sendFile(path.join(rootDir, "views", "shop.html"));
});

router.use("/products", products);

// Catch all unresolved urls
router.use((req, res, next) => {
  // 404 page
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

module.exports = router;
