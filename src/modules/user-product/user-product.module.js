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

router.get("/byuser/:id", (req, res) => {
  userProductController.getByUserId(req, res);
});

router.get("/byproduct/:id", (req, res) => {
  userProductController.getByProductId(req, res);
});

router.delete("/:id", (req, res) => {
  userProductController.delete(req, res);
});

module.exports = { router };
