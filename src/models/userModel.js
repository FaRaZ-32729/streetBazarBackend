const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    }, // 👈 Added: optional address
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;