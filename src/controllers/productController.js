const Product = require("../models/productModel");
const fs = require("fs");
const path = require("path");

// add product
const addProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one product image is required",
            });
        }

        const product = await Product.create({
            ...req.body,
            images: req.files.map((file) => file.filename),
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

//get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category", "name");
        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// get single product
const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
            .populate("category", "name");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (err) {
        return res.status(500).json({ message: "Invalid Product ID" });
    }
};

// update products
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { removedImages = [] } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // remove selected images
        if (removedImages.length > 0) {
            removedImages.forEach((img) => {
                const imgPath = path.join("uploads/products", img);
                if (fs.existsSync(imgPath)) {
                    fs.unlinkSync(imgPath);
                }
            });

            product.images = product.images.filter(
                (img) => !removedImages.includes(img)
            );
        }

        // add new images
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => file.filename);
            product.images.push(...newImages);
        }

        // update other fields
        Object.keys(req.body).forEach((key) => {
            if (key !== "removedImages") {
                product[key] = req.body[key];
            }
        });

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


// delete product with image

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // delete images
        product.images.forEach((img) => {
            const imgPath = path.join("uploads/products", img);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        });

        await product.deleteOne();

        res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
