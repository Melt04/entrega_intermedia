const { Router } = require('express')
const router = Router()

const { isLogged } = require('../middleware')
const {
  createNewCart,
  deleteCartById,
  getProductsFromCart,
  deleteProductsFromCart,
  addProductToCart,
  getAllCarts,
  testCart
} = require('../controllers/carts')

router.post('/', isLogged, addProductToCart)
/* router.delete('/checkout', deleteCartById) */
/* router.get('/products', getProductsFromCart) */
/* router.post('/products', addProductToCart) */
router.delete('/:idProd', isLogged, deleteProductsFromCart)
router.get('/', isLogged, getProductsFromCart)

module.exports = { router }
