const { getMaxId } = require('../../../helpers/index')
const repository = require('../../daos/producto/index')
class Products {
  constructor() {
    this.repository = repository
    this.repository.connect()
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
  removeStock(num, id) {
    const index = this.products.findIndex((product) => id == product.id)
    if (index > -1) {
      if (this.products[index].stock >= num) {
        console.log(`stock ${this.products[index].stock}`)
        this.products[index].stock = this.products[index].stock - num
        return true
      }
      return false
    }
    return false
  }

  async deleteProductById(id) {
    return this.repository.deleteById(id)

  }
}
module.exports = new Products()
