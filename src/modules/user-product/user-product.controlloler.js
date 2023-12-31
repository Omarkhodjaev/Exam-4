const { ResData } = require("../../library/resData");
const {
  UserProductBadRequestException,
} = require("./exception/user-product.exception");
const {
  userProductScheme,
  userProductUpdateScheme,
} = require("./validation/user-product.validation");

class UserProductController {
  #userProductService;
  constructor(UserProductService) {
    this.#userProductService = UserProductService;
  }

  async create(req, res) {
    try {
      const dto = req.body;
      const userId = req.userId.id;
      dto.count = Number(dto.count);

      const validated = userProductScheme.validate(dto);
      if (validated.error) {
        throw new UserProductBadRequestException(validated.error.message);
      }

      const resData = await this.#userProductService.create(dto, userId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getByUserId(req, res) {
    try {
      const userId = req.params.id;

      const resData = await this.#userProductService.getByUserId(userId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getByProductId(req, res) {
    try {
      const productId = req.params.id;

      const resData = await this.#userProductService.getByProductId(productId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async delete(req, res) {
    try {
      const userProductId = req.params.id;

      const resData = await this.#userProductService.delete(userProductId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "Server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req, res) {
    try {
      const dto = req.body;

     
      const userProductId = req.params.id;

      dto.count = Number(dto.count);

      const validated = userProductUpdateScheme.validate(dto);

      if (validated.error) {
        throw new UserProductBadRequestException(validated.error.message);
      }

      const resData = await this.#userProductService.update(dto, userProductId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode);
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { UserProductController };
