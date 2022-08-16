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
  async getUserByEmail (data) {
    return await this.daoCarrito.getByField(data, 'email')
  }

  async getAllCarts () {
    return this.daoCarrito.getAll()
  }
  async deleteCartById (id) {
    return this.daoCarrito.deleteByUserId(id.userId)
  }

  async getContentOfCart (email) {
    let products
    const [cart] = await this.daoCarrito.getByField(email, 'owner')
    if (typeof cart == 'undefined') return null
    if (cart.products.length > 0) {
      products = JSON.parse(cart.products)
    } else {
      products = JSON.parse(cart.products)
    }

    return products
  }
  async addProductToCart (email, idProduct) {
    try {
      const prod = await Products.getProductById(idProduct)
      const { id: idProd, name, desc, price, stock } = prod
      if (stock < 0) {
        throw new Error('No hay suficientes productos')
      }
      const prodCart = await this.getContentOfCart(email)
      const findIndex = prodCart.findIndex(element => element.id == idProduct)
      if (findIndex > -1) {
        prodCart[findIndex].q++
      } else {
        prodCart.push({ id: idProd, name, desc, price, q: 1 })
      }
      await Products.removeStock(1, idProd)
      return this.daoCarrito.updateByField('owner', email, {
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
