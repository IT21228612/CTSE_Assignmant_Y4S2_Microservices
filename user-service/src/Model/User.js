const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  category: { type: String, enum: ['Home', 'Shop'], required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
