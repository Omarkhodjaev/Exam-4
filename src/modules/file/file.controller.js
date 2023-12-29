const { ResData } = require("../../library/resData");

class FileController {
  #fileService;
  constructor(FileService) {
    this.#fileService = FileService;
  }

  async singleUpload(req,res){
    const file = req.file;
    
    const resData = await this.#fileService.singleUpload(file);
    res.status(resData.statusCode).json(resData);
  }

  async getAll(req, res) {
    const resData = await this.#fileService.getAll();
    res.status(resData.statusCode).json(resData);
  }
}

module.exports = { FileController };
