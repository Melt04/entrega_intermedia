const MongoContainer = require('../src/contenedor/MongoContainer')
const knex = require('knex')
const connectDbSqlite = () => {
  const sqlite3Options = {
    client: 'sqlite3',
    connection: {
      filename: './db/mysqlite3/mydq.sqlite'
    },
    useNullAsDefault: true
  }
  return (knexInstance = knex(sqlite3Options))
}

module.exports = { connectDbSqlite }
