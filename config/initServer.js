const config = require('./config.json')
const { connectDbSqlite } = require('./configDb')
const exp = {}

configServer = async () => {
  process.env.persistencia = config.persistencia
  /*  if (config.persistencia == 'mongo') {
    try {
      await connectDbMongo()
    } catch (e) {
      throw new Error(e.message)
    }
  } */
  if (config.persistencia == 'sqlite') {
    const knexInstance = connectDbSqlite()
    exp.knexInstance = knexInstance
  }
}

exp.configServer = configServer
module.exports = {
  exp
}
