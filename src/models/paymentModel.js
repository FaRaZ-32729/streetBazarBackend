const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    paymentMethod: String,
    amount: Number,

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    transactionId: String,
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("Payment", paymentSchema);

module.exports = paymentModel;
