const { Router } = require("express");
const { NotificationController } = require("./notification.controller");
const { NotificationService } = require("./notification.service");
const { AuthorizationMiddleware } = require("../../library/middleware");
const router = Router();

const notificationService = new NotificationService();
const notificationController = new NotificationController(notificationService);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post(
  "/",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    notificationController.create(req, res);
  }
);

router.get(
  "/allnotification",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    notificationController.getAll(req, res);
  }
);

router.get(
  "/:id",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    notificationController.getById(req, res);
  }
);

router.delete(
    "/:id",
    authorizationMiddleware.checkUser,
    authorizationMiddleware.adminRole,
    (req, res) => {
      notificationController.delete(req, res);
    }
  );

module.exports = { router };
