const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { signupLimiter } = require("../middlewares/ratelimiter");

// When POST /api/users/signup is called → run signup()

router.post("/signup", signupLimiter, userController.signup);

module.exports = router;
