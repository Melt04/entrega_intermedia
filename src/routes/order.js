const { Router } = require('express')
const router = Router()
const { getAllOrders, checkOut } = require('../controllers/orders')
const { isLogged } = require('../middleware/index')
router.post('/', isLogged, checkOut)
router.get('/', isLogged, getAllOrders)

module.exports = { router }
