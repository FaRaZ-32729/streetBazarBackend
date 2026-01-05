const Review = require("../models/reviewModel");

// ✅ Add Review (One review per user per product)
const addReview = async (req, res) => {
    try {
        const { product, rating, comment } = req.body;
        const userId = req.user._id; // from auth middleware

        const exists = await Review.findOne({ user: userId, product });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "You have already reviewed this product",
            });
        }

        const review = await Review.create({
            user: userId,
            product,
            rating,
            comment,
        });

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            data: review,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get All Reviews (Optional filter by product)
const getAllReviews = async (req, res) => {
    try {
        const filter = {};
        if (req.query.productId) {
            filter.product = req.query.productId;
        }

        const reviews = await Review.find(filter)
            .populate("user", "name")
            .populate("product", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get Single Review
const getSingleReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const review = await Review.findById(reviewId)
            .populate("user", "name")
            .populate("product", "name");

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review fetched successfully",
            data: review,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid Review ID",
        });
    }
};

// ✅ Update Review (Owner only)
const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;

        const review = await Review.findOneAndUpdate(
            { _id: reviewId, user: userId },
            req.body,
            { new: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or unauthorized",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Delete Review (Owner or Admin)
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;
        const role = req.user.role;

        const review =
            role === "admin"
                ? await Review.findByIdAndDelete(reviewId)
                : await Review.findOneAndDelete({ _id: reviewId, user: userId });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or unauthorized",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid Review ID",
        });
    }
};

module.exports = {
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};
