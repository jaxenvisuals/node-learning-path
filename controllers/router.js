const express = require("express");
const homeController = require("./homeController");

const router = express.Router();

router.get("/", homeController.index);
router.get("/login", homeController.login);
router.post("/login", homeController.createLogin);
router.get("/signup", homeController.signup);
router.post("/signup", homeController.createSignup);

module.exports = router;
