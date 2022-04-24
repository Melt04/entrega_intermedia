const mongoose = require('mongoose')
const MongoContainer = require('../../contenedor/MongoContainer')
const cartSchema = new mongoose.Schema({
  products: { type: Array, required: true },
})
const cartModel = mongoose.model('Cart', cartSchema)

class DaoMongoCart extends MongoContainer {
  constructor() {
    super(cartModel)
  }
}

module.exports = DaoMongoCart
