const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const products = require("./products");

const router = express.Router();

router.get("/", (req, res, next) => {
  // Home
  res.status(200).render("shop", { docTitle: "Sh" });
});

router.use("/products", products);

// Catch all unresolved urls
router.use((req, res, next) => {
  // 404 page
  res.status(404).render("404", { docTitle: "Not Found" });
});

module.exports = router;
