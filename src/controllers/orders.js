const Cart = require('../Repository/Cart/index')
const User = require('../Repository/User/index')
const Order = require('../Repository/Order/index')
getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.getAllOrders()
    res.send(allOrders)
  } catch (error) {
    next(new Error(error.message))
  }
}

module.exports = {
  getAllOrders
}
