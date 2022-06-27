const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  age: Number,
  address: String,
  telnumber: Number
})

userModel = mongoose.model('User', userSchema)
module.exports = userModel
