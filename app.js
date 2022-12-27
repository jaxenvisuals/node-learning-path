const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const router = require("./routes/index");
const rootDir = require("./util/path");

const app = express();

// Serve static files
app.use(express.static(path.join(rootDir, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen("3000");
