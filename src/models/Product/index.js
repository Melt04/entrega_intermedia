class Product {
  constructor({ id, nombre, desc, codigo, foto, precio, stock }) {
    this.id = id;
    this.nombre = nombre;
    this.timestamp = new Date().toISOString();
    this.desc = desc;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
  }
}

module.exports = Product;
