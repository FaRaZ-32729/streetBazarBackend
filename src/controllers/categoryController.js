const Category = require("../models/categoryModel");

// ✅ Add Category
const addCategory = async (req, res) => {
    try {
        const { name, season } = req.body;

        const exists = await Category.findOne({ name });
        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }

        const category = await Category.create({ name, season });

        return res.status(201).json({
            success: true,
            message: "Category added successfully",
            data: category,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get All Categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Get Single Category
const getSingleCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid Category ID",
        });
    }
};

// ✅ Update Category
const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByIdAndUpdate(
            categoryId,
            req.body,
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// ✅ Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid Category ID",
        });
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
