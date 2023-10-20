const express = require("express");
const authController = require("../Controllers/authController");

const router = express.router();

router.get("/getaccounts", authController.allAccount);
router.post("/createaccount", authController.createAccount);

module.exports = router;

