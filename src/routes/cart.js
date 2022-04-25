const { Router } = require('express')
const router = Router()

const {
  createNewCart,
  deleteCartById,
  getProductsFromCart,
  deleteProductsFromCart,
  addProductToCart,
  getAllCarts
} = require('../controllers/carts')

router.post('/', createNewCart)
router.delete('/:id', deleteCartById)
router.get('/:id/products', getProductsFromCart)
router.post('/:id/products', addProductToCart)
router.delete('/:id/products/:idProd', deleteProductsFromCart)
router.get('/', getAllCarts)
module.exports = { router }
