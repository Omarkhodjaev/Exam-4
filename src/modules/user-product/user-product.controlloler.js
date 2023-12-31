const { ResData } = require("../../library/resData");
const {
  UserProductBadRequestException,
} = require("./exception/user-product.exception");
const { userProductScheme } = require("./validation/user-product.validation");

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
}

module.exports = { UserProductController };
