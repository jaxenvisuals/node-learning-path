const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    product: null,
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findProduct({
    id: productId,
    cb: (productData) => {
      if (!productData) return get404(req, res, next);

      const prod = new Product(productData);

      res.render("admin/edit-product", {
        pageTitle: "Edit Product - " + prod.title,
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        product: prod,
      });
    },
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({ title, imageUrl, description, price });
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log("error saving product", err));
};

exports.postEditProduct = (req, res, next) => {
  const prodData = req.body;

  const prod = new Product(prodData);

  prod.update(() => {
    res.redirect("/product-detail/" + prod.id);
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, columns]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/products",
        userScope: {
          editProduct: true,
          deleteProduct: true,
        },
      });
    })
    .catch((err) => console.log("Error fetching products", err));
};
