const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  name: String,
  address: String,
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['customer', 'manager'],
    required: true
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {
  UserModel
};
