const { ResData } = require("../../library/resData");
const { UserBadRequestException } = require("./exception/user.exception");
const { userScheme } = require("./validation/user.validation");

class UserController {
  #userService;
  constructor(UserService) {
    this.#userService = UserService;
  }

  async register(req, res) {
    try {
      const dto = req.body;

      const validated = userScheme.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.register(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode || 500);
      res.status(resData.statusCode).json(resData);
    }
  }

  async registerForAdmin(req, res) {
    try {
      const dto = req.body;

      const validated = userScheme.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.registerForAdmin(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode || 500);
      res.status(resData.statusCode).json(resData);
    }
  }

  async login(req, res) {
    try {
      const dto = req.body;

      const validated = userScheme.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.login(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode || 500);
      res.status(resData.statusCode).json(resData);
    }
  }

  async getAllUsers(req, res) {
    const resData = await this.#userService.getAllUsers();
    return res.status(resData.statusCode).json(resData);
  }

  async getUser(req, res) {
    try {
      const userId = req.params.id;

      const resData = await this.#userService.getUserById(userId);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "Server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const resData = await this.#userService.deleteUser(userId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "Server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async updateUser(req, res) {
    try {
      const dto = req.body;
      const userId = req.params.id;

      const validated = userScheme.validate(dto);

      if (validated.error) {
        throw new UserBadRequestException(validated.error.message);
      }

      const resData = await this.#userService.updateUser(dto, userId);
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

module.exports = { UserController };
