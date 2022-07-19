const assert = require('assert').strict
const { expect } = require('chai')
const request = require('supertest')
const app = require('../../app')
describe('Prueba de  AMB de productos', function () {
  it('Deberia devolver status 200 y un array', async function () {
    let response = await request(app).get('/api/products')
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('array')
  })
  it('Deberia devolver status 200 y message de confirmacion', async function () {
    const updateProduct = {
      name: 'Mochila',
      desc: 'Mochila',
      code: 3,
      urlPhoto: 'http',
      price: 9,
      stock: 1
    }

    let response = await request(app)
      .put('/api/products/3')
      .send({ newProduct: updateProduct })
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body)
      .to.have.property('message')
      .to.eq('Se actualizo con Exito')
  })
  it('Deberia devolver status 200 y mensaje ok', async function () {
    const product = {
      name: 'Mochila',
      desc: 'Mochila',
      code: 3,
      urlPhoto: 'http',
      price: 9,
      stock: 1
    }

    let response = await request(app)
      .post('/api/products')
      .send({ product })
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body)
      .to.have.property('message')
      .to.eq('ok')
  })
  it('Deberia devolver status 200 y mensaje ok', async function () {
    const product = {
      name: 'Mochila',
      desc: 'Mochila',
      code: 3,
      urlPhoto: 'http',
      price: 9,
      stock: 1
    }

    let response = await request(app).delete('/api/products/7')
    expect(response.status).to.eq(200)
    expect(response.body).to.be.an('object')
    expect(response.body)
      .to.have.property('message')
      .to.eq('Borrado con exito')
  })
})
