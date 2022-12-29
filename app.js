const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const router = require("./routes/index");
const rootDir = require("./util/path");

const app = express();

// set view engine
app.set("view engine", "pug");
app.set("views", "views");

// Serve static files
app.use(express.static(path.join(rootDir, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen("3000");
