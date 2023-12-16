const express = require("express");
const cartController = require("../controllers/cartController");
const { IdentityVerifier } = require("../middleware/IdentityVerifier");

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", IdentityVerifier, cartController.addUserCartItem);
cartRouter.get("/cart-items", IdentityVerifier, cartController.fetchUserCartItems);
cartRouter.put("/update-cart-item", IdentityVerifier, cartController.updateUserCartItemQuantity);
cartRouter.delete("/delete-cart-item/:id", IdentityVerifier, cartController.removeUserCartItem);

module.exports = {
    cartRouter
};
