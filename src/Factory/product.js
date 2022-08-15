const DaoFileProduct = require('../daos/producto/DaoFileProduct')
const DaoMongoProduct = require('../daos/producto/DaoMongoProduct')
const DaoSqliteProduct = require('../daos/producto/DaoSqliteProduct')

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
