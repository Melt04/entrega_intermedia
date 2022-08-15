const mongoose = require('mongoose')
const { boolean } = require('yargs')

const MongoContainer = require('../../contenedor/MongoContainer')
const { isAdmin } = require('../../middleware')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxlength: 100 },
  name: { type: String, required: true, maxlength: 80 },
  lastName: { type: String, required: true, maxlength: 80 },
  phone: { type: String, required: true, maxlength: 15 },
  urlPhoto: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: false
  }
})
userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
})

const userModel = mongoose.model('User', userSchema)

class DaoMongoUser extends MongoContainer {
  constructor () {
    super(userModel)
  }
}

module.exports = DaoMongoUser
