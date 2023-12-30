const path = require("path");
const { DataSource } = require("./dataSource");
const {
  ProductNotFound,
} = require("../modules/product/exception/product.exception");

const findProductById = (productId) => {
  const productPath = path.join(__dirname, "../../database", "products.json");
  const productDataSource = new DataSource(productPath);
  const products = productDataSource.read();

  const foundProduct = products.find((product) => product.id === productId);

  if (!foundProduct) {
    throw new ProductNotFound();
  }

  return foundProduct;
};

module.exports = { findProductById };
