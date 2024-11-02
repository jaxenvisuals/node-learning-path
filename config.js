const dotenv = require("dotenv");
const path = require("path");
const express = require("express");

const app = express();

dotenv.config({
  path: path.resolve(__dirname, "./.env/" + app.get("env") + ".env"),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
};
