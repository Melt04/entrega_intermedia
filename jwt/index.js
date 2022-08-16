const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY

function generateToken (email) {
  return new Promise((resolve, reject) => {
    jwt.sign({ email }, privateKey, (error, token) => {
      if (!error) {
        return resolve(token)
      }
      return reject(error)
    })
  })
}
function validateToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (error, token) => {
      if (!error) {
        return resolve(token)
      }
      return reject(error)
    })
  })
}

module.exports = {
  generateToken,
  validateToken
}
