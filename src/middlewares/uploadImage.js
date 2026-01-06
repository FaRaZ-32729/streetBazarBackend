const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure upload directory exists
const uploadDir = "uploads/products";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
        );
    },
});

// file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) cb(null, true);
    else cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
};

// multer setup
const uploadProductImages = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024, files: 5 },
    fileFilter,
});

module.exports = uploadProductImages;
