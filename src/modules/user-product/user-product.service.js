const { DataSource } = require("../../library/dataSource");
const { findProductById } = require("../../library/productFindById");
const uuid = require("uuid");
const path = require("path");
const { UserProduct } = require("./entity/user-product.entity");
const { dateGenerator } = require("../../library/dateGenerator");
const { ResData } = require("../../library/resData");

class UserProductService {
  create(dto, userId) {
    const foundProudctById = findProductById(dto.productId);

    console.log(userId);
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
      foundProudctById.price * dto.count / 100,
      "pending"
    );
    userProducts.push(newUserProduct);
    userProductDataSource.write(userProducts);

    const resData = new ResData("User product created", 200, newUserProduct);
    return resData;
  }
}

module.exports = { UserProductService };
