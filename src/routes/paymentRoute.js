const express = require("express");
const validate = require("../middlewares/validate");
const { createPaymentValidator, updatePaymentValidator } = require("../validators/paymentValidator");
const { createPayment, getSinglePayment, updatePayment, deletePayment } = require("../controllers/paymentController");
const router = express.Router();

// Routes
router.post("/create", validate(createPaymentValidator), createPayment);
router.get("/all", getAllPayments);
router.get("/single/:paymentId", getSinglePayment);

router.put("/update/:paymentId", validate(updatePaymentValidator), updatePayment);

router.delete("/delete/:paymentId", deletePayment);

module.exports = router;
