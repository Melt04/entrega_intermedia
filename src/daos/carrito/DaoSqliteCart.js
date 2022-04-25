const SqliteContainer = require("../../contenedor/Sqlite3Container");
class DaoSqliteCart extends SqliteContainer {
    constructor() {
        super('cart')

    }
    async connect() {

        try {
            const exist = await this.db.schema.hasTable(this.table)
            if (!exist) {
                await this.db.schema.createTable(this.table, (t) => {
                    t.increments('id'), t.json("products")
                })
            }
        } catch (e) {
            throw new Error(e.message)
        }
    }

}

module.exports = DaoSqliteCart