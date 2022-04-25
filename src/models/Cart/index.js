
const Products = require('../Products/index')
const repository = require('../../daos/carrito/index')


class Cart {
  constructor() {
    this.repository = repository
    this.repository.connect()
  }
  async createNewCart(data) {
    return this.repository.insert(data)

  }
  async getAllCarts() {
    return this.repository.getAll()
  }
  async deleteCartById(id) {
    return this.repository.deleteById(id)
  }
  async getContentOfCart(id) {
    let products;
    const cart = await this.repository.getById(id)
    if (cart.length > 0) {
      products = JSON.parse(cart[0].products)
    } else {
      console.log(cart)
      products = JSON.parse(cart.products)
    }
    return products

  }
  async addProductToCart(id, idProduct) {
    try {
      const prod = await Products.getProductById(idProduct)
      const prodCart = await this.getContentOfCart(id)
      prodCart.push(prod)
      return this.repository.updateById(id, { products: JSON.stringify(prodCart) })
    } catch (e) {

      throw new Error(e.message)
    }

  }
  async deleteProductFromCart(id, idProduct) {
    try {
      const prodCart = await this.getContentOfCart(id)
      console.log(prodCart)
      const newProductCart = prodCart.filter(element => {
        console.log(element)
        if (element !== null) {
          return element.id != idProduct
        }
      });
      return this.repository.updateById(id, { products: JSON.stringify(newProductCart) })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
module.exports = new Cart()
