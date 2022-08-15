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
  const { user } = req.body

  try {
    await User.createUser({ user })
    //TODO: Devolver token
    return res.json({ message: 'ok' })
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById
}
