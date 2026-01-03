const express = require("express");
const { addProductSchema, updateProductSchema } = require("../validators/productValidator");
const { addProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const uploadProductImages = require("../middlewares/uploadImage");
const validate = require("../middlewares/validate");
const router = express.Router();

/* Routes */
router.post(
    "/add",
    uploadProductImages.array("images", 5),
    validate(addProductSchema),
    addProduct
);

router.get("/all", getAllProducts);
router.get("/:productId", getSingleProduct);
router.put(
    "/update/:productId",
    uploadProductImages.array("images", 5),
    validate(updateProductSchema),
    updateProduct
);
router.delete("/delete/:productId", deleteProduct);

module.exports = router;
