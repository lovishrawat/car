const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
