const express = require("express");
const cartController = require("../controllers/cartController");
const { auth } = require("../middleware/auth");

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", auth, cartController.addUserCartItem);
cartRouter.get("/cart-items", auth, cartController.fetchUserCartItems);
cartRouter.put("/update-cart-item", auth, cartController.updateUserCartItemQuantity);
cartRouter.delete("/delete-cart-item/:id", auth, cartController.removeUserCartItem);

module.exports = {
    cartRouter
};
