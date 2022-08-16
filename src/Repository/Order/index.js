const daoOrder = require('../../daos/Orders/index')
class Orders {
  constructor (daoOrder) {
    if (Orders.instance == null) {
      this.daoOrder = daoOrder
      Orders.instance = this
    }
    return Orders.instance
  }
  async getAllOrders () {
    return await this.daoOrder.getAll()
  }
}
module.exports = new Orders(daoOrder)
