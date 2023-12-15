const { CartModel } = require("../models/cartModel");

const fetchUserCartItems = async (req, res) => {
    try {
        const { userId } = req.body;
        const userCart = await CartModel.findOne({ userId }).populate({ path: 'items.productId', select: '-quantity' });
        res.status(200).json(userCart);
    } catch (error) {
        console.error("Error in fetchUserCartItems:", error.message);
        res.status(500).json({ error: "Failed to retrieve user's cart items" });
    }
};

const addUserCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const existingCartItem = await CartModel.findOne({ userId, 'items.productId': productId });

        if (existingCartItem) {
            return res.status(500).json({ error: "Product is already in the cart" });
        }

        const userCart = await CartModel.findOneAndUpdate(
            { userId },
            { $addToSet: { items: { productId, quantity } } },
            { upsert: true, new: true }
        );
        res.status(200).json(userCart);
    } catch (error) {
        console.error("Error in addUserCartItem:", error.message);
        res.status(500).json({ error: "Failed to add product to the user's cart" });
    }
};

const removeUserCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const userCart = await CartModel.findOneAndUpdate(
            { userId },
            { $pull: { items: { _id: id } } },
            { new: true }
        );
        res.status(200).json({ message: "Product removed from the user's cart" });
    } catch (error) {
        console.error('Error in removeUserCartItem:', error.message);
        res.status(500).json({ error: "Failed to remove product from the user's cart" });
    }
};

const updateUserCartItemQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const userCart = await CartModel.findOneAndUpdate(
            { userId, 'items.productId': productId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );
        res.status(200).json({ message: "User cart item quantity updated successfully!" });
    } catch (error) {
        console.error("Error in updateUserCartItemQuantity:", error.message);
        res.status(500).json({ error: "Failed to update user's cart item quantity" });
    }
};

module.exports = {
    addUserCartItem,
    fetchUserCartItems,
    updateUserCartItemQuantity,
    removeUserCartItem
};
