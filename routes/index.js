const path = require("path");

const express = require("express");

const products = require("./products");

const router = express.Router();

router.get("/", (req, res, next) => {
  // Home
  res
    .status(200)
    .sendFile(path.join(__dirname, "../", "views", "home.html"));
});

router.use("/products", products);

// Catch all unresolved urls
router.use((req, res, next) => {
  // 404 page
  res
    .status(404)
    .sendFile(path.join(__dirname, "../", "views", "404.html"));
});

module.exports = router;
