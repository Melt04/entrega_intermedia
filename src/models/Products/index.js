const { getMaxId } = require('../../../helpers/index')
const repository = require('../../daos/producto/index')
class Products {
  constructor() {
    this.repository = repository

  }
  async getAllProducts() {
    return this.repository.getAll()

  }
  async getProductById(id) {
    return this.repository.getById(id)
  }
  createProduct(product) {
    return this.repository.insert(product)
  }
  updateProductById(id, newProduct) {
    return this.repository.updateById(id, newProduct)
  }
  async addStock(num, id) {
    let stock
    const product = await this.repository.getById(id)
    if (product.length > 0) {
      stock = product[0].stock
    } else {
      stock = product.stock
    }
    this.repository.updateById(id, { stock: stock + num })
    return

  }
  async removeStock(num, id) {
    let stock
    const product = await this.repository.getById(id)
    if (product.length > 0) {
      stock = product[0].stock
    } else {
      stock = product.stock
    }
    this.repository.updateById(id, { stock: stock - num })


  }

  async deleteProductById(id) {
    return this.repository.deleteById(id)

  }
}
module.exports = new Products()
