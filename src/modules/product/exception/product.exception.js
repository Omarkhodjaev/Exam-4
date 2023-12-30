class ProductBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class ProductNotFound extends Error {
  constructor() {
    super("Product not found");

    this.statusCode = 404;
  }
}

module.exports = { ProductBadRequestException, ProductNotFound };
