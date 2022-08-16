const { Router } = require('express')
const router = Router()
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById
} = require('../controllers/products')
const {
  isAdmin,
  validateCreateProduct,

  isLogged
} = require('../middleware/index')
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', isLogged, isAdmin, validateCreateProduct, createProduct)
router.delete('/:id', isLogged, isAdmin, deleteProductById)
router.put('/:id', isLogged, isAdmin, updateProductById)

module.exports = { router }
