const express = require("express");
const homeController = require("./homeController");

const router = express.Router();

router.get("/", homeController.index);

module.exports = router;
