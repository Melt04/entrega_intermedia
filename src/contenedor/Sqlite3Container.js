const knex = require('knex')
const sqlite3Options = {
  client: 'sqlite3',
  connection: {
    filename: './db/mysqlite3/mydq.sqlite',
  },
  useNullAsDefault: true,
}

class SqliteContainer {
  constructor(table) {
    this.table = table
    this.db = knex(sqlite3Options)

  }
  async connect() {
  }

  async getAll() {
    try {
      const data = await this.db(this.table).select('*')
      return data
    } catch (e) {
      throw new Error(e.message)

    }
  }
  async insert(data) {
    try {
      const insertedData = await this.db(this.table).insert(data)
      return insertedData
    } catch (e) {
      throw new Error(e.message)

    }
  }
  async getById(id) {
    try {
      const [data] = await this.db(this.table).select('*').where('id', '=', id)
      return data
    } catch (e) {
      throw new Error(e.message)

    }
  }
  async deleteById(id) {
    try {
      const deletedData = await this.db(this.table).where('id', '=', id).del()
      return deletedData
    } catch (e) {
      throw new Error(e.message)

    }
  }
  async updateById(id, newData) {
    try {
      const updatedData = await this.db(this.table).where('id', '=', id).update(newData)
      return updatedData
    } catch (e) {
      throw new Error(e.message)

    }
  }
  async deleteAll() {
    try {
      const deleteTable = await this.db(this.table).del()
      return deleteTable
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = SqliteContainer
