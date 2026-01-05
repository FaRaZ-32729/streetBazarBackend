const express = require("express");
const validate = require("../middlewares/validate");
const { addCategorySchema, updateCategorySchema } = require("../validators/categoryValidator");
const { addCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");
const router = express.Router();


// Routes
router.post("/add", validate(addCategorySchema), addCategory);
router.get("/all", getAllCategories);
router.get("/single/:categoryId", getSingleCategory);
router.put("/update/:categoryId", validate(updateCategorySchema), updateCategory);
router.delete("/delete/:categoryId", deleteCategory);

module.exports = router;
