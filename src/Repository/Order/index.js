const daoOrder = require('../../daos/Orders/index')
const { OrderSaveDto, OrderDto } = require('../../DTOs/Order')
const Cart = require('../Cart/index')

class Orders {
  constructor (daoOrder) {
    if (Orders.instance == null) {
      this.daoOrder = daoOrder
      Orders.instance = this
    }
    return Orders.instance
  }
  async getAllOrdersFromCustomer (customer) {
    let allOrders = await this.daoOrder.getByField(customer, 'customer')

    let mappedOrders = []
    for (const order of allOrders) {
      let productMapped = JSON.parse(order.products)
      const email = order.customer
      const date = order.date
      mappedOrders.push(new OrderDto({ email, date, products: productMapped }))
    }
    return mappedOrders
  }
  async checkOutCart (cartOwner) {
    try {
      const cartContent = await Cart.getContentOfCart(cartOwner)
      if (cartContent && cartContent.length > 0) {
        const order = {
          email: cartOwner,
          products: JSON.stringify(cartContent)
        }
        const orderSaveDto = new OrderSaveDto(order)
        const savedOrder = await this.daoOrder.insert(orderSaveDto)
        await Cart.daoCarrito.updateByField('owner', cartOwner, {
          products: JSON.stringify([])
        })

        return true
      } else return false
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
module.exports = new Orders(daoOrder)
