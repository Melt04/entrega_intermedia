const { Router } = require('express')
const router = Router()
const { getAllOrder } = require('../controllers/orders')

const { isLogged } = require('../middleware/index')

router.post('/', isLogged)
router.get('/', isLogged, getAllOrders)

module.exports = { router }
