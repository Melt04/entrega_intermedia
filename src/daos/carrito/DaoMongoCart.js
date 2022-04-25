const mongoose = require('mongoose')
const MongoContainer = require('../../contenedor/MongoContainer')
const cartSchema = new mongoose.Schema({
  products: { type: String, required: true },
})
cartSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
cartSchema.set('toJSON', {
  virtuals: true
});
const cartModel = mongoose.model('Cart', cartSchema)


class DaoMongoCart extends MongoContainer {
  constructor() {
    super(cartModel)
  }
}

module.exports = DaoMongoCart
