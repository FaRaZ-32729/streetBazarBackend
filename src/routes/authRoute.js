const express = require("express");
const validate = require("../middlewares/validate");
const {
  loginSchema,
  changePasswordSchema,
} = require("../validators/authValidator");
const {
  login,
  logout,
  getProfile,
  changePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.delete("/logout", logout);

router.get("/me", authMiddleware, getProfile);
router.patch(
  "/change-password",
  validate(changePasswordSchema),
  authMiddleware,
  changePassword
);

module.exports = router;
