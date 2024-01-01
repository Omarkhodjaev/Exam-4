const { ResData } = require("../../library/resData");
const { FileBadRequestException } = require("./exception/file.exception");
const { fileScheme } = require("./validation/file.validation");

class FileController {
  #fileService;
  constructor(FileService) {
    this.#fileService = FileService;
  }

  async create(req, res) {
    try {
      const file = req.file;
      const dto = req.body;

    

      const validated = fileScheme.validate(dto);

      if (validated.error) {
        throw new FileBadRequestException(validated.error.message);
      }

      const resData = await this.#fileService.singleUpload(file, dto);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode || 500);
      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req, res) {
    try {
      const fileId = req.params.id;

      const resData = await this.#fileService.getById(fileId);
      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(error.message, error.statusCode || 500);
      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req, res) {
    const resData = await this.#fileService.getAll();
    res.status(resData.statusCode).json(resData);
  }

  async delete(req, res) {
    try {
      const fileId = req.params.id;

      const resData = await this.#fileService.deleteUser(fileId);

      res.status(resData.statusCode).json(resData);
    } catch (error) {
      const resData = new ResData(
        error.message || "Server error",
        error.statusCode || 500
      );
      res.status(resData.statusCode).json(resData);
    }
  }
}

module.exports = { FileController };
