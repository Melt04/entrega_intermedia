const mongoose = require('mongoose')
const MongoContainer = require('../../contenedor/MongoContainer')
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  des: { type: String, required: true, maxlength: 140 },
  code: { type: String, required: true },
  urlPhoto: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  date: { type: Date, default: new Date(Date.now()) },
})
const productModel = mongoose.model('Product', productSchema)

class DaoMongoProduct extends MongoContainer {
  constructor() {
    super(productModel)
  }
}

module.exports = DaoMongoProduct
