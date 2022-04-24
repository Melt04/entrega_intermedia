const FileContainer = require('../../contenedor/FileContainer')

class DaoFileCart extends FileContainer {
  constructor(fileRute) {
    super('./db/Cart.json')
  }
}

module.exports = DaoFileCart
