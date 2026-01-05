const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { addReviewValidator, updateReviewValidator } = require("../validators/reviewValidator");
const { addReview, getAllReviews, getSingleReview, updateReview, deleteReview } = require("../controllers/reviewController");
const router = express.Router();


// Routes
router.post("/add", authMiddleware, validate(addReviewValidator), addReview);
router.get("/all", getAllReviews);
router.get("/single/:reviewId", getSingleReview);
router.put("/update/:reviewId", authMiddleware, validate(updateReviewValidator), updateReview);
router.delete("/delete/:reviewId", authMiddleware, deleteReview);

module.exports = router;
