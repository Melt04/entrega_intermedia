const { getMaxId } = require('../../../helpers/index')
const ProductDTO = require('../../DTOs/Product/index')
const daoProduct = require('../../daos/products/index')
class Products {
  constructor (daoProduct) {
    if (Products.instance == null) {
      this.daoProduct = daoProduct
      Products.instance = this
    }
    return Products.instance
  }
  async getAllProducts () {
    const allProducts = await this.daoProduct.getAll()
    const dtoProducts = allProducts.map(prod => {
      return new ProductDTO(prod)
    })
    return dtoProducts
  }
  async getProductById (id) {
    if (typeof id == 'object') {
      id = id.id
    }
    const product = await this.daoProduct.getById(id)

    if (product) {
      return product
    }
    return product
  }
  createProduct ({ product }) {
    return this.daoProduct.insert(product)
  }
  async updateProductById ({ id, newProduct }) {
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
    await this.daoProduct.updateById(id, { stock: stock - num })
  }

  async deleteProductById (id) {
    if (typeof id == 'object') {
      id = id.id
    }
    const deletedProduct = await this.daoProduct.deleteById(id)

    return deletedProduct
  }
}
module.exports = new Products(daoProduct)
