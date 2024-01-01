const { DataSource } = require("../../library/dataSource");
const { findProductById } = require("../../library/productFindById");
const uuid = require("uuid");
const path = require("path");
const { UserProduct } = require("./entity/user-product.entity");
const { dateGenerator } = require("../../library/dateGenerator");
const { ResData } = require("../../library/resData");

const {
  NotFoundByUserId,
  NotFoundByProductId,
  NotFoundById,
} = require("./exception/user-product.exception");

class UserProductService {
  create(dto, userId) {
    const foundProudctById = findProductById(dto.productId);

    const userProductPath = path.join(
      __dirname,
      "../../../database",
      "user-products.json"
    );
    const userProductDataSource = new DataSource(userProductPath);
    const userProducts = userProductDataSource.read();

    const id = uuid.v4();
    const date = dateGenerator();

    const newUserProduct = new UserProduct(
      id,
      userId,
      foundProudctById.id,
      dto.count,
      date,
      foundProudctById.price * dto.count,
      "pending"
    );

    userProducts.push(newUserProduct);
    userProductDataSource.write(userProducts);

    newUserProduct.total_price = (foundProudctById.price * dto.count) / 100;

    const resData = new ResData("User product created", 200, newUserProduct);
    return resData;
  }

  getByUserId(userId) {
    const userProductPath = path.join(
      __dirname,
      "../../../database",
      "user-products.json"
    );
    const userProductDataSource = new DataSource(userProductPath);
    const userProducts = userProductDataSource.read();

    const foundUserProduct = userProducts.find(
      (user) => user.user_id === userId
    );

    foundUserProduct.total_price = foundUserProduct.total_price / 100;

    if (!foundUserProduct) {
      throw new NotFoundByUserId();
    }

    const resData = new ResData(
      "User product taken by user id",
      200,
      foundUserProduct
    );

    return resData;
  }

  getByProductId(productId) {
    const userProductPath = path.join(
      __dirname,
      "../../../database",
      "user-products.json"
    );
    const userProductDataSource = new DataSource(userProductPath);
    const userProducts = userProductDataSource.read();

    const foundUserProduct = userProducts.find(
      (product) => product.product_id === productId
    );

    if (!foundUserProduct) {
      throw new NotFoundByProductId();
    }

    foundUserProduct.total_price = foundUserProduct.total_price / 100;

    const resData = new ResData(
      "User product taken by product id",
      200,
      foundUserProduct
    );

    return resData;
  }

  delete(userProductId) {
    const userProductPath = path.join(
      __dirname,
      "../../../database",
      "user-products.json"
    );
    const userProductDataSource = new DataSource(userProductPath);
    const userProducts = userProductDataSource.read();

    const foundUserProduct = userProducts.find(
      (userProduct) => userProduct.id === userProductId
    );

    if (!foundUserProduct) {
      throw new NotFoundById();
    }

    const filterUserProducts = userProducts.filter(
      (userProduct) => userProduct.id !== userProductId
    );

    userProductDataSource.write(filterUserProducts);
    foundUserProduct.total_price = foundUserProduct.total_price / 100;

    const resData = new ResData("User product deleted", 200, foundUserProduct);
    return resData;
  }

  update(dto, userProductId) {
    const userProductPath = path.join(
      __dirname,
      "../../../database",
      "user-products.json"
    );
    const userProductDataSource = new DataSource(userProductPath);
    const userProducts = userProductDataSource.read();

    const foundUserProduct = userProducts.find(
      (userProduct) => userProduct.id === userProductId
    );

    if (!foundUserProduct) {
      throw new NotFoundById();
    }

    foundUserProduct.count = dto.count;
    foundUserProduct.status = dto.status;

    const foundProudctById = findProductById(foundUserProduct.product_id);

    foundUserProduct.total_price =
      foundUserProduct.count * foundProudctById.price;

    const filterUserProduct = userProducts.filter(
      (product) => product.id !== foundUserProduct.id
    );

    filterUserProduct.push(foundUserProduct);
    userProductDataSource.write(filterUserProduct);
    foundUserProduct.total_price =
      (foundUserProduct.count * foundProudctById.price) / 100;
    const resData = new ResData("User updated", 200, foundUserProduct);
    return resData;
  }
}

module.exports = { UserProductService };
