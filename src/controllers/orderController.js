const Order = require("../models/orderModel");

// ✅ Create Order
const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const order = await Order.create({
            user: userId,
            ...req.body,
        });

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get All Orders (Admin → all | User → own)
const getAllOrders = async (req, res) => {
    try {
        const filter =
            req.user.role === "admin" ? {} : { user: req.user._id };

        const orders = await Order.find(filter)
            .populate("user", "name email")
            .populate("orderItems.product", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get Single Order
const getSingleOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate("user", "name email")
            .populate("orderItems.product", "name");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // User can only see own order
        if (
            req.user.role !== "admin" &&
            order.user._id.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid Order ID",
        });
    }
};

// ✅ Update Order (Admin Only)
const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndUpdate(
            orderId,
            req.body,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Delete Order (Admin Only)
const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid Order ID",
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
};
