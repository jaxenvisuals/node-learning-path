const express = require("express");

const router = require("./routes/index");

const app = express();

app.get("/", (req, res, next) => {
  console.log("In Middleware");
  next();
});

app.use(router);

app.listen("3000");
