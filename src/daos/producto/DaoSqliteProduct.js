const SqliteContainer = require("../../contenedor/Sqlite3Container");
class DaoSqliteProduct extends SqliteContainer {
    constructor() {
        super('product')

    }
    async connect() {

        try {
            const exist = await this.db.schema.hasTable(this.table)
            if (!exist) {

                await this.db.schema.createTable(this.table, (t) => {
                    t.increments('id'), t.string('name').notNullable(), t.string('desc').notNullable(),
                        t.string("code").notNullable(),
                        t.string('urlPhoto').notNullable(),
                        t.float('price').notNullable(),
                        t.integer('stock').notNullable(),
                        t.date("date").defaultTo(new Date(Date.now()))

                })
            }
        } catch (e) {
            throw new Error(e.message)
        }
    }

}


module.exports = DaoSqliteProduct