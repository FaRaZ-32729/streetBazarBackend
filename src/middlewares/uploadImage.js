const multer = require("multer");
const path = require("path");

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/products");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        );
    },
});

// file filter (image validation)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
    }
};

const uploadProductImages = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB per image
        files: 5, // max 5 images
    },
    fileFilter,
});

module.exports = uploadProductImages;
