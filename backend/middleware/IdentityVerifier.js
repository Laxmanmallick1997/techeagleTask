const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
require("dotenv").config();

const IdentityVerifier = async (req, res, next) => {
    try {
        // Retrieve token from Authorization header or cookies
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

        if (!token) {
            // If token is missing, respond with an unauthorized status
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user based on the decoded token's userId
        const user = await UserModel.findById(decodedToken?.userId).select("-password");

        if (!user) {
            // If user not found, respond with an unauthorized status
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Attach the user's ID to the request for further operations
        req.body.userId = user._id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors and respond with a server error status
        console.error("Error in IdentityVerifier middleware:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    IdentityVerifier
};
