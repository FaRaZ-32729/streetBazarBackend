const express = require("express");
const { registerAdminSchema, registerUserSchema, updateUserSchema } = require("../validators/userValidator");
const { registerAdmin, registerUser, getAllUsers, getSingleUser, updateUser, deleteUser } = require("../controllers/userController");
const validate = require("../middlewares/validate");
const router = express.Router();


/* Routes */
router.post("/register-admin", validate(registerAdminSchema), registerAdmin);
router.post("/register-user", validate(registerUserSchema), registerUser);
router.get("/all-users", getAllUsers);
router.get("/single-user/:userId", getSingleUser);
router.put("/update/:userId", validate(updateUserSchema), updateUser);
router.delete("/delete/:userId", deleteUser);

module.exports = router;
