/* const DaoFileCart = require('./DaoFileCart')
 
const DaoMongoCart = require('./DaoMongoCart')
const DaoSqliteCart = require('./DaoSqliteCart') */
const DaoFileCart = require('../daos/carrito/DaoFileCart')
const DaoMongoCart = require('../daos/carrito/DaoMongoCart')
const DaoSqliteCart = require('../daos/producto/DaoSqliteProduct')

class FactorySave {
  createProduct (data) {
    if (data === 'mongo') {
      return new DaoMongoCart()
    } else {
      if (data === 'sqlite') {
        console.log('HERE')
        return new DaoSqliteCart()
      } else {
        return new DaoFileCart()
      }
    }
  }
}
module.exports = FactorySave
