const DaoFileProduct = require('../daos/products/DaoFileProduct')
const DaoMongoProduct = require('../daos/products/DaoMongoProduct')
const DaoSqliteProduct = require('../daos/products/DaoSqliteProduct')

class FactorySave {
  createProduct (data) {
    if (data === 'mongo') {
      return new DaoMongoProduct()
    } else {
      if (data === 'sqlite') {
        return new DaoSqliteProduct()
      } else {
        return new DaoFileProduct()
      }
    }
  }
}
module.exports = FactorySave
