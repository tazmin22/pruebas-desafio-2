const express = require('express')
const {PManager} = require ("./ProductManager")
const app = express()
const port = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const productManager = new PManager ("./pruebas.json")

app.get("/products", async (req, res) => {
  let devolver = req.query;
  let products = await productManager.getProducts();
  const limit = parseInt(req.query.limit, 10);

  if (limit > 0) {
    products = products.slice(0, limit);
  }

  res.send({ products });
});

 
app.get("/productos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productos = await productManager.getProductsById(id);
    res.send({ productos });
  } catch (e) {
    console.error('Error al recuperar productos:', e);
    res.send({ error: 'Se produjo un error al recuperar productos.' });
  }
});

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })