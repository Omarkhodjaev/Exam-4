const { Router } = require("express");
const { FileService } = require("./file.service");
const { FileController } = require("./file.controller.js");
const { upload } = require("../../library/multerStorage");

const fileService = new FileService();
const fileController = new FileController(fileService);

const router = Router();

router.post("/single-upload", upload.single("media"), (req, res) => {
  fileController.singleUpload(req, res);
});

router.get("/allfiles", (req, res) => {
  fileController.getAll(req, res);
});

module.exports = { router };
