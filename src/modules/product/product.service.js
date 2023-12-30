const { DataSource } = require("../../library/dataSource");
const uuid = require("uuid");
const { Product } = require("./entity/product.entity");
const { ResData } = require("../../library/resData");
const path = require("path");
const { findFileById } = require("../../library/fileFindById");
const { findProductById } = require("../../library/productFindById");
const { ProductNotFound } = require("./exception/product.exception");

class ProductService {
  create(dto) {
    const productPath = path.join(
      __dirname,
      "../../../database",
      "products.json"
    );
    const productDataSource = new DataSource(productPath);
    const products = productDataSource.read();

    const id = uuid.v4();

    const foundFileById = findFileById(dto.fileId);

    const newProduct = new Product(
      id,
      foundFileById.id,
      dto.title,
      dto.description,
      dto.price * 100
    );

    products.push(newProduct);

    productDataSource.write(products);

    const resData = new ResData("Product created", 201, newProduct);

    return resData;
  }

  getById(productId) {
    const foundProductById = findProductById(productId);

    foundProductById.price = foundProductById.price / 100; //convert dollar to cent

    if (!foundProductById) {
      throw new ProductNotFound();
    }

    const resData = new ResData(
      "Product is taken by ID",
      200,
      foundProductById
    );
    return resData;
  }

  getAll() {
    const propductPath = path.join(
      __dirname,
      "../../../database",
      "products.json"
    );
    const productDataSource = new DataSource(propductPath);
    const products = productDataSource.read();

    //convert dollar to cent
    const allProducts = products.map((product) => {
      product.price = product.price / 100;
      return product;
    });

    const resData = new ResData("All product are taken", 200, { allProducts });
    return resData;
  }

  delete(productId) {
    const foundProduct = findProductById(productId);

    const productPath = path.join(
      __dirname,
      "../../../database",
      "products.json"
    );
    const productDataSource = new DataSource(productPath);
    const products = productDataSource.read();
    const filterProducts = products.filter(
      (product) => product.id !== foundProduct.id
    );

    productDataSource.write(filterProducts);

    const resData = new ResData("Product deleted", 200, foundProduct);
    return resData;
  }

  async update(dto, productId) {
    const foundProduct = findProductById(productId);

    foundProduct.file_id = dto.fileId;
    foundProduct.title = dto.title;
    foundProduct.description = dto.description;

    const productPath = path.join(
      __dirname,
      "../../../database",
      "products.json"
    );
    const productDataSource = new DataSource(productPath);
    const products = productDataSource.read();

    const filterProducts = products.filter(
      (user) => user.id !== foundProduct.id
    );

    filterProducts.push(foundProduct);
    productDataSource.write(filterProducts);

    const resData = new ResData("Product updated", 200, foundProduct);
    return resData;
  }
}

module.exports = { ProductService };
