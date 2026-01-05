const Cart = require("../models/cartModel");

// ✅ Create Cart (One cart per user)
const createCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {
            return res.status(409).json({
                success: false,
                message: "Cart already exists for this user",
            });
        }

        const cart = await Cart.create({
            user: userId,
            items: req.body.items,
        });

        return res.status(201).json({
            success: true,
            message: "Cart created successfully",
            data: cart,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get Logged-in User Cart
const getSingleCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product", "name images price");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get All Carts (Admin Only)
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate("user", "name email")
            .populate("items.product", "name price");

        return res.status(200).json({
            success: true,
            message: "Carts fetched successfully",
            data: carts,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Update Cart (Replace items)
const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { items: req.body.items },
            { new: true }
        ).populate("items.product", "name price");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Delete Cart (Clear Cart)
const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createCart,
    getSingleCart,
    getAllCarts,
    updateCart,
    deleteCart,
};
