const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  weight: String,
  quantity: Number,
  price: Number,
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = {
  ProductModel
};
