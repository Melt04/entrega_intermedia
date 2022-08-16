const SqliteContainer = require('../../contenedor/Sqlite3Container')
class DaoSqliteOrder extends SqliteContainer {
  constructor () {
    super('order')
    this.connect()
  }
  async connect () {
    try {
      const exist = await this.db.schema.hasTable(this.table)
      if (!exist) {
        await this.db.schema.createTable(this.table, t => {
          t.increments('id'),
            t.string('userId').notNullable(),
            t.json('products')
        })
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = DaoSqliteOrder
