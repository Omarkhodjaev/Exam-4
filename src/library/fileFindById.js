const path = require("path");
const { DataSource } = require("./dataSource");
const { FileNotFound } = require("../modules/file/exception/file.exception");

const findFileById = (fileId) => {
  const findPath = path.join(__dirname, "../../database", "files.json");
  const filesDataSource = new DataSource(findPath);
  const files = filesDataSource.read();

  const foundFile = files.find((file) => file.id === fileId);

  if (!foundFile) {
    throw new FileNotFound();
  }

  return foundFile;
};

module.exports = { findFileById };
