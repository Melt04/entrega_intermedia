const { validateToken } = require('../../jwt')

const fakeUser = require('../../apiData/index').userInfo()
fakeUserMiddleware = (req, res, next) => {
  req.user = fakeUser
  next()
}
isAdmin = (req, res, next) => {
  const { isAdmin } = req.user
  if (isAdmin) return next()
  const error = new Error('No autorizado')
  error.status = 401
  next(error)
}
const fieldsProduct = ['name', 'desc', 'code', 'urlPhoto', 'price', 'stock']
const FIELD_LENGTH = fieldsProduct.length
validateId = (req, res, next) => {
  const { id } = req.params
  if (!isNaN(id)) {
    return next()
  }
  res.status(400).json({ error: 'Formato id invalido' })
}
validateCreateProduct = (req, res, next) => {
  if (!req.body.product)
    return res.status(400).json({ error: 'Error en los campos del producto' })
  fields = Object.keys(req.body.product)
  if (fields.length > FIELD_LENGTH) {
    return res.status(400).json({ error: 'Error en los campos del producto' })
  }
  for (let i = 0; i < FIELD_LENGTH; i++) {
    if (!fieldsProduct.includes(fields[i])) {
      return res.status(400).json({ error: 'Error en los campos del producto' })
    }
  }
  next()
}
isLogged = async (req, res, next) => {
  const headers = req.headers.authorization
  if (headers) {
    const token = headers.split(' ')[1]
    if (token != 'null') {
      try {
        const isValid = await validateToken(token)
        req.user = { email: isValid.email }
        return next()
      } catch (error) {
        return res.status(409).send({ message: 'User not logged in' })
      }
    }
  }
  return res.status(409).send({ message: 'User not logged in' })
}
validateUpdateProduct = (req, res, next) => {
  if (!req.body.newProduct)
    return res.status(400).json({ error: 'Error en los campos del producto' })
  fields = Object.keys(req.body.newProduct)

  if (fields.length === 0 || fields.length > FIELD_LENGTH) {
    return res.status(400).json({ error: 'Error en los campos del producto' })
  }
  for (let i = 0; i <= fields.length - 1; i++) {
    if (!fieldsProduct.includes(fields[i])) {
      return res.status(400).json({ error: 'Error en los campos del producto' })
    }
  }
  next()
}

module.exports = {
  validateId,
  validateCreateProduct,
  validateUpdateProduct,
  fakeUserMiddleware,
  isAdmin,
  isLogged
}
