const express = require("express");

const router = require("./routes");

const app = express();

app.get("/", (req, res, next) => {
  console.log("In Middleware");
  next();
});

app.use(router.requestHandler);

app.listen("3000");
