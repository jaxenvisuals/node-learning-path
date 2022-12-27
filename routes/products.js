const express = require("express");

const router = express.Router();

console.log("here");

router.get("/", (req, res, next) => {
  res.status(200).send(`
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Products</h1>
            <p>Here's the product page</p>
        </body>
    </html>
      `);
});

module.exports = router;
