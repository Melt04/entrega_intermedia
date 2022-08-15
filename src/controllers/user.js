const { createHash } = require('../../helpers')
const { generateToken } = require('../../jwt')
const User = require('../Repository/User/index')

getAllUsers = async (req, res, next) => {
  try {
    const datos = await User.getAllUsers()
    return res.json(datos)
  } catch (e) {
    next(new Error(e.message))
  }
}
getUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    const User = await User.getUserById(id)
    if (User) {
      return res.json(User)
    }
    return res.json({ message: 'No se encontro el Usuario' })
  } catch (e) {
    next(new Error(e.message))
  }
}
createUser = async (req, res, next) => {
  let { user } = req.body
  const password = await createHash(user.password)
  if (!password) {
    return next(new Error('Error while hasing password'))
  }
  user = { ...user, password }
  try {
    await User.createUser({ user })
    const { id, email } = user
    const token = await generateToken(email)

    return res.json({ token })
  } catch (e) {
    next(new Error(e.message))
  }
}
deleteUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    await User.deleteUserById(id)
    return res.send({ message: 'Borrado con exito' })
  } catch (e) {}
}
updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const { newUser } = req.body
    await User.updateUserById({ id, newUser })

    return res.send({ message: 'Se actualizo con Exito' })
  } catch (e) {
    next(new Error(e.message))
  }
}
loginUser = async (req, res, next) => {
  const { email, password } = req.body
  const token = await User.loginUser(email, password)
  if (token) {
    return res.send({ token })
  }
  return res.status(400).send({ message: 'User Not Found' })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  deleteUserById,
  updateUserById
}
