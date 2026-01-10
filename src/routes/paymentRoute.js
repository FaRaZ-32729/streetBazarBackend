const express = require("express");
const validate = require("../middlewares/validate");
const {
  createPaymentValidator,
  updatePaymentValidator,
} = require("../validators/paymentValidator");
const {
  createPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
  getAllPayments,
  markOrderPaid,
  createPaymentIntent,
} = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
router.post(
  "/create",
  authMiddleware,
  validate(createPaymentValidator),
  createPayment
);
router.get("/all", authMiddleware, getAllPayments);
router.get("/single/:paymentId", authMiddleware, getSinglePayment);

router.put(
  "/update/:paymentId",
  authMiddleware,
  validate(updatePaymentValidator),
  updatePayment
);

router.delete("/delete/:paymentId", authMiddleware, deletePayment);

router.post("/create-intent", authMiddleware, createPaymentIntent);
router.patch("/mark-paid/:orderId", authMiddleware, markOrderPaid);

module.exports = router;
