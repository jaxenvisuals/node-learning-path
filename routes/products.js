const express = require("express");

const router = express.Router();

const store = require("../store/index");

router.get("/add-product", (req, res, next) => {
  res.status(200).render("add-product", {
    docTitle: "Add Product",
    url: "/products/add-product",
    useProductStyle: true,
    useFormsStyle: true,
    pageIsAddProduct: true,
  });
});

router.post("/add-product", (req, res, next) => {
  store.products.push(req.body);

  res.setHeader("Location", "/");
  res.status(302).send();
});

module.exports = router;
