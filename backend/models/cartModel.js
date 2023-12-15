const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1 // Default quantity for an item in the cart
    }
  }]
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = {
  CartModel
};
