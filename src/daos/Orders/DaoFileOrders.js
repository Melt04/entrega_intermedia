const FileContainer = require('../../contenedor/FileContainer')

class DaoFileOrder extends FileContainer {
  constructor (fileRute) {
    super('./db/Order.json')
  }
}

module.exports = DaoFileOrder
