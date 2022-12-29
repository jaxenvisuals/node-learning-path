const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const expressHbs = require("express-handlebars");

const router = require("./routes/index");
const rootDir = require("./util/path");

const app = express();

app.engine(
  ".hbs",
  expressHbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

// set view engine
app.set("view engine", ".hbs");
app.set("views", "views");

// Serve static files
app.use(express.static(path.join(rootDir, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen("3000");
