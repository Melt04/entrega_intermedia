const { Router } = require('express')
const router = Router()
const { loginUser } = require('../controllers/user')
const {
  isAdmin,
  validateCreateProduct,
  validateUpdateProduct
} = require('../middleware/index')

router.post('/' /*  isAdmin ,*/ /* validateCreateProduct,  */, loginUser)

module.exports = { router }
