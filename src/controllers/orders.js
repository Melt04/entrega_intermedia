const User = require('../Repository/User/index')
const Order = require('../Repository/Order/index')
getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.getAllOrdersFromCustomer(req.user.email)
    res.send(allOrders)
  } catch (error) {
    next(new Error(error.message))
  }
}
checkOut = async (req, res, next) => {
  const cartOwner = req.user.email
  try {
    const orderChecked = await Order.checkOutCart(cartOwner)
    if (orderChecked) {
      res.send({ message: 'Checkout success' })
    } else {
      res.send({ message: 'No products to check' })
    }
  } catch (error) {
    next(new error(error.message))
  }
}

module.exports = {
  getAllOrders,
  checkOut
}
