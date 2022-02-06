const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const { router: routerCart } = require("./routes/cart");
const { router: routerProduct } = require("./routes/products");
const { fakeUserMiddleware } = require("./middleware/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fakeUserMiddleware);
app.use("/api/products", routerProduct);
app.use("/api/cart", routerCart);

app.use("*", (req, res) => {
  const { method, path } = req;

  res.send({ error: -1, description: `Ruta ${path} metodo ${method} no implementado` });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  res.status(status).send({ message });
});
app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`);
});
