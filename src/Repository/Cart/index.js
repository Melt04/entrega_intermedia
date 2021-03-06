const Products = require('../Products/index')
const daoCarrito = require('../../daos/carrito/index')

class Cart {
  constructor () {
    this.daoCarrito = daoCarrito
  }
  async createNewCart (data) {
    return this.daoCarrito.insert(data)
  }
  async getByUserId (data) {
    return this.daoCarrito.getByUserId(data)
  }

  async getAllCarts () {
    return this.daoCarrito.getAll()
  }
  async deleteCartById (id) {
    return this.daoCarrito.deleteByUserId(id.userId)
  }

  async getContentOfCart (id) {
    let products
    const { userId } = id
    const cart = await this.daoCarrito.getByUserId(userId)
    if (typeof cart == 'undefined') return null
    if (cart.products.length > 0) {
      products = JSON.parse(cart.products)
    } else {
      products = JSON.parse(cart.products)
    }
    console.log('retorna productos', products)
    return products
  }
  async addProductToCart (id, idProduct) {
    try {
      const prod = await Products.getProductById(idProduct)
      const { id: idProd, name, desc, price, stock } = prod
      if (stock < 0) {
        throw new Error('No hay suficientes productos')
      }
      const prodCart = await this.getContentOfCart(id)
      const findIndex = prodCart.findIndex(element => element.id == idProduct)
      if (findIndex > -1) {
        prodCart[findIndex].q++
      } else {
        prodCart.push({ id: idProd, name, desc, price, q: 1 })
        console.log('productoagregado', prodCart)
      }
      await Products.removeStock(1, idProduct)
      return this.daoCarrito.updateByUserId(id.userId, {
        products: JSON.stringify(prodCart)
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async deleteProductFromCart (id, idProduct) {
    try {
      const prodCart = await this.getContentOfCart(id)
      let qty
      const newProductCart = prodCart.filter(element => {
        if (element !== null) {
          if (element.id == idProduct) {
            qty = element.q
          }
          return element.id != idProduct
        }
      })
      await Products.addStock(qty, idProduct)
      return this.daoCarrito.updateByUserId(id.userId, {
        products: JSON.stringify(newProductCart)
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
module.exports = new Cart()
