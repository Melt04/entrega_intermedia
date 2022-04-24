const FileContainer = require('../../contenedor/FileContainer')

class DaoFileProducto extends FileContainer {
  constructor(fileRute) {
    super('./db/Products.json')
  }
}

module.exports = DaoFileProducto
