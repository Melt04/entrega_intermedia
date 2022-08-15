const DaoFileUser = require('./DaoFileUser')
const DaoMongoUser = require('./DaoMongoUser')
const DaoSqliteUser = require('./DaoSqliteUser')

const persistencia = process.env.persistencia
if (persistencia === 'mongo') {
  module.exports = new DaoMongoUser()
} else {
  if (persistencia === 'sqlite') {
    module.exports = new DaoSqliteUser()
  } else {
    module.exports = new DaoFileUser()
  }
}
