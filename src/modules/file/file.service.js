const path = require("path");
const { ResData } = require("../../library/resData");
const { fileServerUrl } = require("../../config");
const { FileNotFound } = require("./exception/file.exception");
const fs = require("fs");
const { fetchAll, fetch } = require("../../library/pg.js");

class FileService {
  async singleUpload(file, dto) {
    const fileName = file.filename;

    const fileURL = fileServerUrl + fileName;

    const newFile = await fetch(
      `INSERT INTO files (path, mime_type, original_name, size)
       VALUES ($1, $2, $3, $4) returning *`,
      fileURL,
      file.mimetype,
      dto.originalName,
      file.size
    );

    const resData = new ResData("A file uploaded", 200, {
      newFile,
      fileURL,
    });

    return resData;
  }

  async getById(fileId) {
    const foundfile = await fetch(`SELECT * FROM files WHERE id = '${fileId}'`);

    if (!foundfile) {
      throw new FileNotFound();
    }

    const resData = new ResData("File taken by id", 200, foundfile);
    return resData;
  }

  async getAll() {
    const files = await fetchAll(`SELECT * FROM files`);

    const resData = new ResData("All files taken", 200, files);
    return resData;
  }

  async deleteUser(fileId) {
    const foundFile = await fetch(
      `DELETE from files
      WHERE id = '${fileId}'
      RETURNING *`
    );

    if (!foundFile) {
      throw new FileNotFound();
    }

    const filename = path.basename(foundFile.path);

    const filePath = path.join(__dirname, "../../../uploads", filename);

    if (fs.existsSync(filePath)) {
      // Delete the file
      fs.unlinkSync(filePath);

      const resData = new ResData("File deleted", 200, foundFile);
      return resData;
    } else {
      const resData = new ResData("File couldn't delete", 200, foundFile);
      return resData;
    }
  }
}

module.exports = { FileService };
