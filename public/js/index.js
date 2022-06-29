const loadingModal = new bootstrap.Modal(
  document.getElementById('loadingModal')
)
const infoModal = new bootstrap.Modal(document.getElementById('infoModal'))
const textModal = document.querySelector('#messageModal')
const buttonComprar = document.querySelector('#bComprar')
const bLogout2 = document.querySelector('#bLogout2')

buttonComprar.addEventListener('click', async e => {
  e.preventDefault()
  checkout()
})

async function renderProductTable () {
  const productsResponse = await fetch(`http://localhost:8080/api/products`)
  const products = await productsResponse.json()
  const data = await fetch('http://localhost:8080/plantilla/productos.hbs')
  const html = await data.text()
  var template = Handlebars.compile(html)
  const table = document.querySelector('#product-table')
  table.innerHTML = template({ products })
}
async function renderCartTable () {
  const cartResponse = await fetch('http://localhost:8080/api/carts/products')
  const cartsProducts = await cartResponse.json()
  const data = await fetch('http://localhost:8080/plantilla/carrito.hbs')
  const html = await data.text()
  var template = Handlebars.compile(html)
  const table = document.querySelector('#cart-table')
  if (cartsProducts.length > 0) {
    buttonComprar.disabled = false
  } else {
    buttonComprar.disabled = true
  }
  table.innerHTML = template({ cartsProducts })
}

async function renderTables () {
  loadingModal.show()
  await Promise.all([renderProductTable(), renderCartTable()])
  loadingModal.hide()
}
async function renderMessages ({ messages }) {
  let allMessages = ''
  const data = await fetch('http://localhost:8080/plantilla/mensajes.hbs')
  const html = await data.text()
  const template = Handlebars.compile(html)
  messages.forEach(message => {
    allMessages = allMessages.concat(template({ message }))
  })
  const messageDiv = document.querySelector('#message')
  messageDiv.innerHTML = allMessages
}
async function addProductToCart (idProd) {
  try {
    const cartResponse = await fetch(
      'http://localhost:8080/api/carts/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idProd })
      }
    )
    const cart = await cartResponse.json()
    textModal.textContent = cart.message
    if (cartResponse.status == 200) {
      await renderTables()
    }
  } catch (error) {
    textModal.textContent = error.message
    console.log(error)
  }
  infoModal.show()
}
async function deleteProductById (id) {
  try {
    const cartResponse = await fetch(
      `http://localhost:8080/api/carts/products/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const cart = await cartResponse.json()
    textModal.textContent = cart.message
    if (cartResponse.status == 200) {
      await renderTables()
    }
  } catch (error) {
    textModal.textContent = error.message
    console.log(error)
  }
  infoModal.show()
}
async function checkout () {
  try {
    loadingModal.show()

    const cartResponse = await fetch(
      `http://localhost:8080/api/carts/checkout`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const cart = await cartResponse.json()
    textModal.textContent = cart.message
    if (cartResponse.status == 200) {
      await renderTables()
    }

    infoModal.show()
  } catch (error) {
    textModal.textContent = error.message
    console.log(error)
  }
}
renderTables()

/* form.addEventListener('submit', e => {
  const form = document.querySelector('.message_main_form')
  e.preventDefault()
  const email = document.querySelector('#email_input').value
  const message = document.querySelector('#message_send').value
  const name = document.querySelector('#name_send').value
  const age = document.querySelector('#age_send').value
  const alias = document.querySelector('#alias_send').value
  const lastname = document.querySelector('#lastname_send').value
  const avatar = document.querySelector('#avatar_send').value
  document.querySelector('#alias_send').value = ''
  document.querySelector('#email_input').value = ''
  document.querySelector('#name_send').value = ''
  document.querySelector('#lastname_send').value = ''
  document.querySelector('#age_send').value = ''
  document.querySelector('#avatar_send').value = ''
  document.querySelector('#message_send').value = ''
}) */
