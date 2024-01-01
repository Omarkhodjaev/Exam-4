const { ResData } = require("../../library/resData");
const {
  NotificationBadRequest,
} = require("./exception/notification.exception");
const { notificationScheme } = require("./validation/notification.validation");

class NotificationController {
  #notificationService;
  constructor(NotificationService) {
    this.#notificationService = NotificationService;
  }

  async create(req, res) {
    try {
      const dto = req.body;

      const validated = notificationScheme.validate(dto);

      if (validated.error) {
        throw new NotificationBadRequest(validated.error.message);
      }

      const resData = await this.#notificationService.create(dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const notificationId = req.params.id;

      const resData = await this.#notificationService.getById(notificationId);

      return res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "Server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req, res) {
    const resData = await this.#notificationService.getAll();
    return res.status(resData.statusCode).json(resData);
  }
}

module.exports = { NotificationController };
