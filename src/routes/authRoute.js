const express = require("express");
const validate = require("../middlewares/validate");
const loginSchema = require("../validators/authValidator");
const { login, logout } = require("../controllers/authController");

const router = express.Router();


router.post("/login", validate(loginSchema), login);
router.delete("/logout/:userId", logout);

module.exports = router;
