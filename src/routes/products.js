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
  validateUpdateProduct
} = require('../middleware/index')
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', /*  isAdmin ,*/ /* validateCreateProduct,  */ createProduct)
router.delete('/:id', /* isAdmin, */ deleteProductById)
router.put(
  '/:id',
  /* isAdmin, */ /* validateUpdateProduct, */ updateProductById
)

module.exports = { router }
