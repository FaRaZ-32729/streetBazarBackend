// @/models/cartModel.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product", // ✅ Make sure this matches your Product model name
                    required: true, // ✅ Add required
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                size: String,
                color: String,
                price: {
                    type: Number,
                    required: true, // ✅ Add required for price
                },
            },
        ],
    },
    { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;