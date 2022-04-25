
const config = require('./config.json')
const { connectDbMongo, connectDbSqlite } = require('./configDb')
const exp = {}

configServer = async () => {
    process.env.PORT = config.puerto
    process.env.urlMongo = config.urlMongo
    process.env.persistencia = config.persistencia
    process.env.NODE_ENV = config.enviroment
    if (config.persistencia == 'mongo') {
        try {
            await connectDbMongo()
        }
        catch (e) {
            throw new Error(e.message)

        }
    }
    if (config.persistencia == "sqlite") {
        const knexInstance = connectDbSqlite()
        exp.knexInstance = knexInstance

    }
}

exp.configServer = configServer
module.exports = {
    exp
}