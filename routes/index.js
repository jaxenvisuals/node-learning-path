const express = require("express");

const products = require("./products");

const router = express.Router();

router.get("/", (req, res, next) => {
  // Home
  res.status(200).send(`
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop</title>
        </head>
        <body>
            <h1>Welcome to Shop!</h1>
            <p>Buy products here</p>
        </body>
    </html>
      `);
});

router.use("/products", products);

// Catch all unresolved urls
router.use((req, res, next) => {
  // 404 page
  res.status(404).send(`
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>404 Page</h1>
            <p>Route: ${req.url} was not found on the server</p>
        </body>
    </html>
      `);
});

module.exports = router;
