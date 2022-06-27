const { Router } = require('express')
const router = Router()

const {
  createNewCart,
  deleteCartById,
  getProductsFromCart,
  deleteProductsFromCart,
  addProductToCart,
  getAllCarts,
  testCart
} = require('../controllers/carts')

router.post('/', createNewCart)
router.delete('/checkout', deleteCartById)
router.get('/products', getProductsFromCart)
router.post('/products', addProductToCart)
router.delete('/products/:idProd', deleteProductsFromCart)
router.get('/', getAllCarts)

module.exports = { router }
