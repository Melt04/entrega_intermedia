const FileContainer = require('../../contenedor/FileContainer')

class DaoUserContainer extends FileContainer {
  constructor (fileRute) {
    super('./db/User.json')
  }
}

module.exports = DaoUserContainer
