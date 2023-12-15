const { UserModel } = require("../models/userModel");
const { token } = require("../utils/srver");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { email, phone, name, address, password, userType } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            name,
            email,
            phone,
            address,
            userType,
            password: hashedPassword
        });

        const token = token(newUser._id, res);
        const userData = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            userType: newUser.userType,
            token: token
        };
        res.status(201).json(userData);
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ error: "Failed to register user" });
    }
};

const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password || ""))) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = token(user._id, res);
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            userType: user.userType,
            token: token
        };
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error in authenticateUser:', error.message);
        res.status(500).json({ error: "Failed to authenticate user" });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully!" });
    } catch (error) {
        console.error('Error in logoutUser:', error.message);
        res.status(500).json({ error: "Failed to log out user" });
    }
};

module.exports = {
    registerUser,
    authenticateUser,
    logoutUser
};
