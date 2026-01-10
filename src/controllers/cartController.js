// @/controllers/cartController.js
const Cart = require("../models/cartModel");
const Product = require("../models/productModel"); // ✅ Import Product model

// ✅ Create Cart with proper validation
const createCart = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Validate items
        if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items array is required and must not be empty",
            });
        }

        // Check if cart already exists
        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {
            return res.status(409).json({
                success: false,
                message: "Cart already exists for this user",
            });
        }

        // ✅ Validate all products exist
        const productIds = req.body.items.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });
        
        if (products.length !== productIds.length) {
            return res.status(400).json({
                success: false,
                message: "One or more products not found",
            });
        }

        // Create cart
        const cart = await Cart.create({
            user: userId,
            items: req.body.items,
        });

        // Populate product details
        const populatedCart = await Cart.findById(cart._id)
            .populate("items.product", "name images price discountPrice stock");

        return res.status(201).json({
            success: true,
            message: "Cart created successfully",
            data: populatedCart,
        });
    } catch (err) {
        console.error("❌ Create Cart Error:", err); // ✅ Log error
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
            error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

// ✅ Update Cart with validation
const updateCart = async (req, res) => {
    try {
        // Validate items
        if (!req.body.items || !Array.isArray(req.body.items)) {
            return res.status(400).json({
                success: false,
                message: "Items array is required",
            });
        }

        // ✅ Validate all products exist
        const productIds = req.body.items.map(item => item.product);
        const products = await Product.find({ _id: { $in: productIds } });
        
        if (products.length !== productIds.length) {
            return res.status(400).json({
                success: false,
                message: "One or more products not found",
            });
        }

        // Update cart
        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { items: req.body.items },
            { new: true, runValidators: true } // ✅ Add runValidators
        ).populate("items.product", "name images price discountPrice stock");

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
        console.error("❌ Update Cart Error:", err); // ✅ Log error
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
            error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }
};

// ✅ Get Single Cart
const getSingleCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product", "name images price discountPrice stock");

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
        console.error("❌ Get Cart Error:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};

// ✅ Get All Carts (Admin)
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate("user", "name email")
            .populate("items.product", "name price discountPrice");

        return res.status(200).json({
            success: true,
            message: "Carts fetched successfully",
            data: carts,
        });
    } catch (err) {
        console.error("❌ Get All Carts Error:", err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Delete Cart
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
        console.error("❌ Delete Cart Error:", err);
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