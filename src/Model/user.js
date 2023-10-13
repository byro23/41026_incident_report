const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  firstname: String,
  lastname: String,
  email: String,
  password: String 
}, { collection: 'Users' });

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
