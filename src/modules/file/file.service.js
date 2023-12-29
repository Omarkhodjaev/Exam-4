const uuid = require("uuid");
const path = require("path");
const { ResData } = require("../../library/resData");
const { fileServerUrl } = require("../../config");
const { DataSource } = require("../../library/dataSource");
const { File } = require("./entity/file.entity");

class FileService {
  singleUpload(file) {
    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const files = fileDatasource.read();

    const fileName = file.filename;

    const fileURL = fileServerUrl + fileName;

    const id = uuid.v4();

    const newFile = new File(id, fileURL, file.mimetype, file.name, file.size);

    files.push(newFile);
    fileDatasource.write(files);

    const resData = new ResData("Single file uploaded", 200, {
      newFile,
      fileURL,
    });

    return resData;
  }

  getAll() {
    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const files = fileDatasource.read();

    const resData = new ResData("All files taken", 200, files);
    return resData;
  }
}

module.exports = { FileService };
