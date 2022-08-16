const { getMaxId, isValidPassword } = require('../../../helpers/index')
const UserDto = require('../../DTOs/User')
const daoUser = require('../../daos/user/index')
const { generateToken } = require('../../../jwt')
const logger = require('../../../logger')

class User {
  constructor (daoUser) {
    if (User.instance == null) {
      this.daoUser = daoUser
      User.instance = this
    }
    return User.instance
  }
  async getAllUsers () {
    const allUsers = await this.daoUser.getAll()
    const dtoUser = allUsers.map(prod => {
      return new UserDto(prod)
    })
    return dtoUser
  }
  async getUserById (id) {
    if (typeof id == 'object') {
      id = id.id
    }
    const user = await this.daoUser.getById(id)
    return new daoUserUserDto(user)
  }
  async getUserByEmail (email) {
    const userByEmail = await this.daoUser.getByField(email, 'email')
    return new daoUserUserDto(user)
  }
  createUser ({ user }) {
    return this.daoUser.insert(user)
  }
  async updateUserById ({ id, newUser }) {
    const updatedUser = await this.daoUser.updateById(id, newUser)
    return new daoUserUserDto(updatedUser)
  }

  async deleteUserById (id) {
    if (typeof id == 'object') {
      id = id.id
    }
    return this.daoUser.deleteById(id)
  }
  async isUserAdmin (email) {
    try {
      const [user] = await this.daoUser.getByField(email, 'email')
      return user.isAdmin
    } catch (error) {
      logger.error(error.message)
      return false
    }
  }
  async loginUser (email, password) {
    try {
      const [user] = await this.daoUser.getByField(email, 'email')
      if (user) {
        const match = await isValidPassword(user, password)
        if (match) {
          const token = await generateToken(user.email)
          return token
        }
      } else {
      }
    } catch (error) {
      return {}
    }
  }
}
module.exports = new User(daoUser)
