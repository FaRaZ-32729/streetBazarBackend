const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                name: String,
                price: Number,
                quantity: Number,
                size: String,
                color: String,
            },
        ],

        shippingAddress: {
            type: String,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "Stripe", "JazzCash", "Easypaisa"],
            required: true,
        },

        paymentResult: {
            id: String,
            status: String,
        },

        itemsPrice: Number,
        shippingPrice: Number,
        taxPrice: Number,
        totalPrice: Number,

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: Date,

        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },

        deliveredAt: Date,
    },
    { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;    
