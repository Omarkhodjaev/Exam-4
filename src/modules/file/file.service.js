const uuid = require("uuid");
const path = require("path");
const { ResData } = require("../../library/resData");
const { fileServerUrl } = require("../../config");
const { DataSource } = require("../../library/dataSource");
const { File } = require("./entity/file.entity");
const { FileNotFound } = require("./exception/file.exception");

class FileService {
  singleUpload(file, dto) {
    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const files = fileDatasource.read();

    const fileName = dto.filename;
    const fileURL = fileServerUrl + fileName;

    const id = uuid.v4();

    const newFile = new File(
      id,
      fileURL,
      file.mimetype,
      dto.originalName,
      file.size
    );

    files.push(newFile);
    fileDatasource.write(files);

    const resData = new ResData("Single file uploaded", 200, {
      newFile,
      fileURL,
    });

    return resData;
  }

  getById(fileId) {
    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const files = fileDatasource.read();

    const foundfile = files.find((file) => file.id === fileId);
    if (!foundfile) {
      throw new FileNotFound();
    }

    const resData = new ResData("File taken by id", 200, foundfile);
    return resData;
  }

  getAll() {
    const filePath = path.join(__dirname, "../../../database", "files.json");
    const fileDatasource = new DataSource(filePath);
    const files = fileDatasource.read();

    const resData = new ResData("All files taken", 200, files);
    return resData;
  }

  deleteUser(fileId) {
    const { data: foundFile } = this.getById(fileId);

    const userPath = path.join(__dirname, "../../../database", "files.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const filterUsers = users.filter((user) => user.id !== foundFile.id);

    userDataSource.write(filterUsers);

    const resData = new ResData("File deleted", 200, foundFile);
    return resData;
  }
}

module.exports = { FileService };
