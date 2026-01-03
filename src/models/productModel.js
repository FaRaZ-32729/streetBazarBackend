const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        discountPrice: {
            type: Number,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        sizes: [String],
        colors: [String],

        images: [String],

        stock: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;  
