const express = require("express");
const validate = require("../middlewares/validate");
const { createCartValidator, updateCartValidator } = require("../validators/cartValidator");
const { createCart, getSingleCart, getAllCarts, updateCart, deleteCart } = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
router.post("/create", authMiddleware, validate(createCartValidator), createCart);
router.get("/my-cart", authMiddleware, getSingleCart);
router.get("/all", authMiddleware, getAllCarts);
router.put("/update", authMiddleware, validate(updateCartValidator), updateCart);
router.delete("/delete", authMiddleware, deleteCart);

module.exports = router;
