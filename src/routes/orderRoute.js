const express = require("express");
const validate = require("../middlewares/validate");
const {
  createOrderValidator,
  updateOrderValidator,
} = require("../validators/orderValidator");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
router.post(
  "/create",
  authMiddleware,
  validate(createOrderValidator),
  createOrder
);
router.get("/all", authMiddleware, getAllOrders);
router.get("/single/:orderId", authMiddleware, getSingleOrder);
router.put(
  "/update/:orderId",
  authMiddleware,
  validate(updateOrderValidator),
  updateOrder
);
router.delete("/delete/:orderId", authMiddleware, deleteOrder);

module.exports = router;
