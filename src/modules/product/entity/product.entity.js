class Product {
  constructor(id, fileId, title, description, price) {
    this.id = id;
    this.file_id = fileId;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

module.exports = {Product};
