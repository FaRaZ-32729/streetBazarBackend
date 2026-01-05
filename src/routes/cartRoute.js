const express = require("express");
const validate = require("../middlewares/validate");
const { createCartValidator, updateCartValidator } = require("../validators/cartValidator");
const { createCart, getSingleCart, getAllCarts, updateCart, deleteCart } = require("../controllers/cartController");
const router = express.Router();

// Routes
router.post("/create", validate(createCartValidator), createCart);
router.get("/my-cart", getSingleCart);
router.get("/all", getAllCarts);
router.put("/update", validate(updateCartValidator), updateCart);
router.delete("/delete", deleteCart);

module.exports = router;
