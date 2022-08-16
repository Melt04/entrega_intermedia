const mongoose = require('mongoose')
const MongoContainer = require('../../contenedor/MongoContainer')

const orderSchema = new mongoose.Schema({
  customer: { type: String, require: true },
  date: { type: Date, default: new Date(Date.now()) },
  products: { type: String, required: true }
})
orderSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
orderSchema.set('toJSON', {
  virtuals: true
})
const orderModel = mongoose.model('Order', orderSchema)

class DaoMongoOrder extends MongoContainer {
  constructor () {
    super(orderModel)
  }
}

module.exports = DaoMongoOrder
