const { getMaxId } = require('../../../helpers/index')
const ProductDTO = require('../../DTOs/Product/index')
const daoProduct = require('../../daos/producto/index')
class Products {
  constructor () {
    this.daoProduct = daoProduct
  }
  async getAllProducts () {
    const allProducts = await this.daoProduct.getAll()
    const dtoProducts = allProducts.map(prod => {
      return new ProductDTO(prod)
    })
    return dtoProducts
  }
  async getProductById (id) {
    const product = await this.daoProduct.getById(id)

    return new ProductDTO(product)
  }
  createProduct (product) {
    return this.daoProduct.insert(product)
  }
  async updateProductById (id, newProduct) {
    const updatedProduct = await this.daoProduct.updateById(id, newProduct)

    return new ProductDTO(updatedProduct)
  }
  async addStock (num, id) {
    let stock
    const product = await this.daoProduct.getById(id)
    if (product.length > 0) {
      stock = product[0].stock
    } else {
      stock = product.stock
    }
    this.daoProduct.updateById(id, { stock: stock + num })
    return
  }
  async removeStock (num, id) {
    let stock
    const product = await this.daoProduct.getById(id)
    if (product.length > 0) {
      stock = product[0].stock
    } else {
      stock = product.stock
    }
    this.daoProduct.updateById(id, { stock: stock - num })
  }

  async deleteProductById (id) {
    return this.daoProduct.deleteById(id)
  }
}
module.exports = new Products()
