const express = require("express");
const router = express.Router();
const { validateUser } = require("../middlewares.js");
const userController = require("../controllers/userController.js");

router.get("/me", userController.getAuthStatus);
router.get("/logout", userController.logout);
router.post("/signup", validateUser, userController.signupAndLogin);
router.post("/login", userController.login);

module.exports = router;