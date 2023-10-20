const express = require("express");
const authController = require("../Controllers/authController");

const router = express.router();

router.get("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
