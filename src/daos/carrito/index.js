const DaoFileCart = require('./DaoFileCart')
const DaoMongoCart = require('./DaoMongoCart')
const DaoSqliteCart = require('./DaoSqliteCart')

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
