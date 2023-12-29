const { Router } = require("express");
const { UserController } = require("./user.controller");
const { UserService } = require("./user.service");
const { AuthorizationMiddleware } = require("../../library/middleware.js");

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);
const authorizationMiddleware = new AuthorizationMiddleware();

router.post(
  "/signup-admin",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    userController.registerForAdmin(req, res);
  }
);

router.post("/signup-user", (req, res) => {
  userController.register(req, res);
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.get(
  "/allusers",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    userController.getAllUsers(req, res);
  }
);

router.get("/:id", (req, res) => {
  userController.getUser(req, res);
});

router.delete(
  "/:id",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    userController.deleteUser(req, res);
  }
);

router.put("/:id", (req, res) => {
  userController.updateUser(req, res);
});

module.exports = { router };
