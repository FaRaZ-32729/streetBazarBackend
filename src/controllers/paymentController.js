const Payment = require("../models/paymentModel");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Payment
const createPayment = async (req, res) => {
  try {
    const userId = req.user._id;

    const payment = await Payment.create({
      user: userId,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Create Stripe PaymentIntent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Amount and orderId required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: "usd",
      metadata: { orderId, userId: req.user._id.toString() },
    });

    res
      .status(200)
      .json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Mark order paid
const markOrderPaid = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentIntentId } = req.body;

    const payment = await Payment.findOne({ order: orderId });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    payment.status = "success";
    payment.transactionId = paymentIntentId;
    await payment.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Payment marked as paid",
        data: payment,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Single Payment
const getSinglePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate("user", "name email")
      .populate("order");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // User can only see own payment
    if (
      req.user.role !== "admin" &&
      payment.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      data: payment,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid Payment ID",
    });
  }
};

// ✅ Get All Payments (Admin → all | User → own)
const getAllPayments = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user._id };

    const payments = await Payment.find(filter)
      .populate("user", "name email")
      .populate("order")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      data: payments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Update Payment (Admin Only)
const updatePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findByIdAndUpdate(paymentId, req.body, {
      new: true,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Delete Payment (Admin Only)
const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findByIdAndDelete(paymentId);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid Payment ID",
    });
  }
};

module.exports = {
  createPayment,
  getSinglePayment,
  getAllPayments,
  updatePayment,
  deletePayment,
  markOrderPaid,
  createPaymentIntent,
};
