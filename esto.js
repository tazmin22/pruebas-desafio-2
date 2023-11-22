const express = require('express')
const {PManager} = require ("./ProductManager")
const app = express()
const port = 8080


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new PManager ("./pruebas.json")

app.get("/products", async  (req, res) => {
    let devolver = req.query;
    const products = await productManager.getProducts();
    res.send({products});
  });

  //app.get("/products/:id", async  (req, res) => {
    
    //const id = req.params.id;
    //const encontrados = products.find((item) => item.id === id);
    //res.send({encontrados});
  //});
    

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })