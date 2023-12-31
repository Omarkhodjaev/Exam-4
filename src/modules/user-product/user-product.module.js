const { Router } = require("express");
const { AuthorizationMiddleware } = require("../../library/middleware.js");
const { UserProductService } = require("./user-product.service.js");
const { UserProductController } = require("./user-product.controlloler.js");

const router = Router();

const userProductService = new UserProductService();
const userProductController = new UserProductController(userProductService);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post(
  "/",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    userProductController.create(req, res);
  }
);

module.exports = { router };
