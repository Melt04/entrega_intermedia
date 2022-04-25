const config = require('../config.json')
getMaxId = (array) => {
  console.log(array.length)
  const maxId = array.length > 0 ? array[array.length - 1].id + 1 : 0;
  return maxId;
};
configServer = () => {
  process.env.PORT = config.puerto
  process.env.urlMongo = config.urlMongo
  process.env.persistencia = config.persistencia
}
module.exports = {
  getMaxId,
  configServer
};
