const FileContainer = require('../../contenedor/FileContainer')

class DaoFileProduct extends FileContainer {
  constructor(fileRute) {
    super('./db/Product.json')
  }
}

module.exports = DaoFileProduct
