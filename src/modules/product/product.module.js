const { Router } = require("express");
const { AuthorizationMiddleware } = require("../../library/middleware.js");
const { ProductService } = require("./product.service.js");
const { ProductController } = require("./product.controller.js");

const router = Router();

const productService = new ProductService();
const productController = new ProductController(productService);

const authorizationMiddleware = new AuthorizationMiddleware();

router.post(
  "/",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    productController.create(req, res);
  }
);

router.get("/allproducts", (req, res) => {
  productController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  productController.getById(req, res);
});

router.delete(
  "/:id",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    productController.delete(req, res);
  }
);

router.put(
  "/:id",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    productController.update(req, res);
  }
);

module.exports = { router };
