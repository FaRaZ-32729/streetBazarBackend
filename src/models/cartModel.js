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
                    ref: "Product",
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                size: String,
                color: String,

                price: Number,
            },
        ],
    },
    { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel; 
