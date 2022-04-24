const products = require("../models/Products");
const Product = require("../models/Product/index");

getAllProducts = (req, res) => {
  const allProducts = products.getAllProducts().filter((product) => {
    return product.stock > 0;
  });
  res.json(allProducts);
};
getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.getProductById(id);
  if (product) {
    return res.json(product);
  }
  return res.json({ message: "No se encontro el producto" });
};
createProduct = (req, res, next) => {
  const { product } = req.body;
  const id = products.getId();
  const newProduct = new Product({ id, ...product });
  if (products.addNewProduct(newProduct)) {
    return res.json({ message: "ok" });
  }
  const error = new Error("Error al crear el producto");
  next(error);
};
deleteProductById = (req, res, next) => {
  const { id } = req.params;
  if (products.deleteProductById(id)) {
    return res.send({ message: "Borrado con exito" });
  }
  const error = new Error("Error al borrar el producto");
  next(error);
};
updateProductById = (req, res, next) => {
  const { id } = req.params;
  const { newProduct } = req.body;
  if (products.updateProductById(id, newProduct)) {
    return res.send({ message: "Se actualizo con Exito" });
  }
  const error = new Error("Error al actualizar el producto");
  next(error);
};

module.exports = {
  products,
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  updateProductById,
};
