const bCrypt = require('bcrypt')
getLastId = product => {
  return product[product.length - 1].id
}

getMaxId = array => {
  const maxId = array.length > 0 ? array[array.length - 1].id + 1 : 0
  return maxId
}
async function isValidPassword (user, password) {
  try {
    const match = await bCrypt.compare(password, user.password)
    return match
  } catch (error) {
    return error.message
  }
}

async function createHash (password) {
  try {
    const hashedPassword = await bCrypt.hash(password, bCrypt.genSaltSync(10))
    return hashedPassword
  } catch (error) {
    return null
  }
}
function formattoHtml (user) {
  const html = `<h1>Usuario Creado ${user.username} </h1>
       <p>Nombre : ${user.name}</p> 
       <p>Edad: ${user.age}</p>
       <p>Tel : ${user.address}</p> 
       <p>Tel : ${user.telnumber}</p> `

  return html
}
function formatProductsToHtml (product) {
  let html = `<h1>Nuevo Pedido  </h1>`
  product.forEach((product, index) => {
    const body = `
    <h3>Producto N${index}</h3>
    <p>Nombre: ${product.name}</p>
    <p>Descripction ${product.desc}</p>
    <p>Price : ${product.price}</p>
    <p>Cantidad : ${product.q}</p>`
    html = html + body
  })

  return html
}
module.exports = {
  getLastId,
  getMaxId,
  isValidPassword,
  createHash,
  formattoHtml,
  formatProductsToHtml
}
