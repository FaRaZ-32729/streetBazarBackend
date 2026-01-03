const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// admin registration api
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            phone: null,
        });

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data: admin,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("error while creating admin");
    }
};

// user registration api
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "customer",
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// get all users 
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ success: true, data: users });
    } catch (err) {
        return res.status(500).json({ message: err.message });
        console.log("error while fetching all users")
    }
};

// get single user by userId
const getSingleUser = async (req, res) => {
    try {
        const id = req.params.userId

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (err) {
        return res.status(500).json({ message: "Invalid User ID" });
        console.log("error while fetching single user ");
    }
};

// update user
const updateUser = async (req, res) => {
    try {
        const id = req.params.userId

        const user = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
        console.log("error while updating the user");
    }
};

// delete user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.userId;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ message: "Invalid User ID" });
    }
};


module.exports = {
    registerAdmin,
    registerUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}