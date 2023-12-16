const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
require("dotenv").config();

const validateRoute = async (req, res, next) => {
    try {
        // Retrieve the token from Authorization header or cookies
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

        if (!token) {
            // If token is missing, respond with unauthorized status
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user based on the decoded token's userId
        const user = await UserModel.findById(decodedToken?.userId).select("-password");

        if (!user || user.userType !== "manager") {
            // If user not found or userType is not manager, respond with unauthorized status
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors and respond with a server error status
        console.error("Error in validateRoute middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    validateRoute
};
