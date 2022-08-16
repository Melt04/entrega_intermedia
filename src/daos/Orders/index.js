const DaoFileCart = require('./DaoFileOrders')
const DaoMongoCart = require('./DaoMongoOrders')
const DaoSqliteCart = require('./DaoSqliteOrders')

const persistencia = process.env.persistencia
if (persistencia === 'mongo') {
  module.exports = new DaoMongoCart()
} else {
  if (persistencia === 'sqlite') {
    module.exports = new DaoSqliteCart()
  } else {
    module.exports = new DaoFileCart()
  }
}
