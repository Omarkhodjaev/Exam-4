class File {
  constructor(id, path, mimeType, originalName, size) {
    (this.id = id),
      (this.path = path),
      (this.mime_type = mimeType),
      (this.original_name = originalName),
      (this.size = size);
  }
}

module.exports = { File };
