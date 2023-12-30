const { Router } = require("express");
const { FileService } = require("./file.service");
const { FileController } = require("./file.controller.js");
const { upload } = require("../../library/multerStorage");
const { AuthorizationMiddleware } = require("../../library/middleware.js");

const fileService = new FileService();
const fileController = new FileController(fileService);
const authorizationMiddleware = new AuthorizationMiddleware();

const router = Router();

router.post("/create", upload.single("media"), (req, res) => {
  fileController.create(req, res);
});

router.get(
  "/allfiles",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    fileController.getAll(req, res);
  }
);

router.get("/:id", (req, res) => {
  fileController.getById(req, res);
});

router.delete(
  "/:id",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    fileController.delete(req, res);
  }
);

module.exports = { router };
