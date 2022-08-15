const { knexInstance } = require('../../config/initServer').exp
class SqliteContainer {
  constructor (table) {
    this.table = table
    this.db = knexInstance
  }

  async getAll () {
    try {
      const data = await this.db(this.table).select('*')
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async insert (data) {
    try {
      const insertedData = await this.db(this.table).insert(data)
      return insertedData
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getByUserId (userId) {
    try {
      const [data] = await this.db(this.table)
        .select('*')
        .where('userId', '=', userId)

      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async updateByUserId (userId, newData) {
    try {
      const updatedData = await this.db(this.table)
        .where('userId', '=', userId)
        .update(newData)
      return updatedData
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async getById (id) {
    try {
      const [data] = await this.db(this.table)
        .select('*')
        .where('id', '=', id)
      return data
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async deleteByUserId (userId) {
    try {
      const deletedData = await this.db(this.table)
        .where('userId', '=', userId)
        .del()
      return deletedData
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async deleteById (id) {
    try {
      const deletedData = await this.db(this.table)
        .where('id', '=', id)
        .del()
      return deletedData
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async updateById (id, newData) {
    try {
      const updatedData = await this.db(this.table)
        .where('id', '=', id)
        .update(newData)
      return updatedData
    } catch (e) {
      throw new Error(e.message)
    }
  }
  async deleteAll () {
    try {
      const deleteTable = await this.db(this.table).del()
      return deleteTable
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = SqliteContainer
