const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        season: {
            type: String,
            enum: ["Winter", "Summer", "All"],
            default: "Winter",
        }
    },
    { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
