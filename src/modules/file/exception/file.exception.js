class FileNotFound extends Error {
  constructor() {
    super("File not found");

    this.statusCode = 404;
  }
}

class FileBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

module.exports = { FileNotFound, FileBadRequestException };
