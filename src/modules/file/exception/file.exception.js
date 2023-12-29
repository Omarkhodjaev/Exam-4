class FileNotFound extends Error {
  constructor() {
    super("File not found");

    this.statusCode = 404;
  }
}

module.exports = { FileNotFound };
