const express = require("express");
const authController = require("../Controllers/authController");

const router = express.router();

router.get("/allToken", authController.allToken);
router.post("/createtoken", authController.addToken);

module.exports = router;
