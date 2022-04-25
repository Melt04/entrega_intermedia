const DaoFileProduct = require('./DaoFileProduct')
const DaoSqliteProduct = require('./DaoSqliteProduct')
const DaoMongoProduct = require('./DaoMongoProduct')

const persistencia = process.env.persistencia
if (persistencia === 'mongo') {
    module.exports = new DaoMongoProduct()
} else {
    if (persistencia === 'sqlite') {

        module.exports = new DaoSqliteProduct()
    } else {
        module.exports = new DaoFileProduct()
    }

}