
const fs = require("fs");


class productManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
  }

  async addProducts(title, description, price, thumbnail, code, stock) {
    const newProduct = {
      id: this.nextId++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);
    const productosEnString = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productosEnString);
  }

  async getProducts() {
    let productsEnElArchivo = await fs.promises.readFile(this.path, "utf-8");
    productsEnElArchivo = JSON.parse(productsEnElArchivo);
    return productsEnElArchivo;
  }

  async getProductsById(id) {
    for (const product of this.products) {
      if (product.id === id) {
        return product;
      }
    }
    throw new Error("El producto con id " + id + " no existe");
  }

  async updateProduct(id, field, value) {
    const product = await this.getProductsById(id);
    if (field === "id") {
      throw new Error("No se puede actualizar el id del producto");
    }
    product[field] = value;
    const productosEnString = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productosEnString);
    return product;
  }
  async deleteProduct(id) {
    const product = await this.getProductsById(id);
    if (!product) {
      throw new Error("El producto con id " + id + " no existe");
    }

    this.products.splice(this.products.indexOf(product), 1);
    const productosEnString = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productosEnString);
  }
};
module.exports = { PManager: productManager }

async function cosasAsincronicas() {
  const usuariosManager = new productManager("pruebas.json");
  //await usuariosManager.addProducts("title", "description", "price", "thumbnail", "code", "stock");
  //await usuariosManager.addProducts("title", "description", "price", "thumbnail", "code", "stock");
 // await usuariosManager.addProducts("producto", "una buena descripcion", 123, "sin imagen", 3, 3);
  //await usuariosManager.deleteProduct(3);

  //const producto = await usuariosManager.updateProduct(1, "title", "probando un nuevo titulo"  );
  //const producto1 = await usuariosManager.updateProduct(1, "description", "probando una nueva descripcion" );
  //console.log(producto);
}

return cosasAsincronicas();