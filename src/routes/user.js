const { Router } = require('express')
const router = Router()
const {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById
} = require('../controllers/user')
const {
  isAdmin,
  validateCreateProduct,
  validateUpdateProduct
} = require('../middleware/index')
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', /*  isAdmin ,*/ /* validateCreateProduct,  */ createUser)
router.delete('/:id', /* isAdmin, */ deleteUserById)
router.put('/:id', /* isAdmin, */ /* validateUpdateProduct, */ updateUserById)

module.exports = { router }
