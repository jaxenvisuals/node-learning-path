const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const router = require("./controllers/router");

const app = express();

// set view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// configure routers
app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
