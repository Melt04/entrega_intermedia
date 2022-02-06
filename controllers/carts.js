const cart = require("../models/Cart/index");
const products = require("../models/Products");
createNewCart = (req, res, next) => {
  const id = cart.createNewCart();
  if (id > -1) {
    return res.send({ id });
  }
  const error = new Error("Error al crear carrito");
  next(error);
};
deleteCartById = (req, res, next) => {
  const { id } = req.params;
  console.log(`asdsa ${id}`);
  if (cart.deleteCart(id)) {
    return res.send({ message: "Borrado con exito" });
  }
  const error = new Error("Error al borrar el carrito");
  next(error);
};

addProductToCart = (req, res, next) => {
  const { id } = req.params;
  const { idProd } = req.params;
  const existProduct = products.getProductById(idProd);
  if (existProduct) {
    if (cart.addProductToCart(id, idProd)) {
      return res.send({ message: "ok" });
    }
  }
  const error = new Error("Error al agregar el producto al carrito");
  next(error);
};
getProductsFromCart = (req, res, next) => {
  const { id } = req.params;
  const content = cart.getContentOfCart(id);
  if (content) {
    return res.send(content);
  }
  const error = new Error("No se pudo recuperar el contenido del carrito");
  next(error);
};
deleteProductsFromCart = (req, res, next) => {
  const { id } = req.params;
  const { idProd } = req.params;
  if (cart.deleteProductFromCart(id, idProd)) {
    return res.send({ message: "ok" });
  }
  const error = new Error("No se pudo borrar el producto del carrito");
  next(error);
};
module.exports = {
  createNewCart,
  deleteCartById,
  getProductsFromCart,
  addProductToCart,
  deleteProductsFromCart,
};
