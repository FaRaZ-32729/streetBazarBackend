const express = require("express");
const validate = require("../middlewares/validate");
const { createOrderValidator, updateOrderValidator } = require("../validators/orderValidator");
const { createOrder, getAllOrders, getSingleOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

// Routes
router.post("/create", validate(createOrderValidator), createOrder);
router.get("/all", getAllOrders);
router.get("/single/:orderId", getSingleOrder);
router.put("/update/:orderId", validate(updateOrderValidator), updateOrder);
router.delete("/delete/:orderId", deleteOrder);

module.exports = router;
