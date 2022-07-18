const FactorySave = require('../../Factory/product')
const DaoFileProduct = require('./DaoFileProduct')
const DaoSqliteProduct = require('./DaoSqliteProduct')
const DaoMongoProduct = require('./DaoMongoProduct')
const persistencia = process.env.persistencia

const Save = new FactorySave().createProduct(persistencia)

module.exports = Save
/* 
if (persistencia === 'mongo') {
    module.exports = new DaoMongoProduct()
} else {
    if (persistencia === 'sqlite') {

        module.exports = new DaoSqliteProduct()
    } else {
        module.exports = new DaoFileProduct()
    }

} */
