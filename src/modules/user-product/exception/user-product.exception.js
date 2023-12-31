class UserProductBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class NotFoundByUserId extends Error {
  constructor() {
    super("User product not found by user Id ");

    this.statusCode = 404;
  }
}

class NotFoundByProductId extends Error {
  constructor() {
    super("User product not found by product Id ");

    this.statusCode = 404;
  }
}

class NotFoundById extends Error {
  constructor() {
    super("User product not found by Id ");

    this.statusCode = 404;
  }
}

module.exports = { UserProductBadRequestException, NotFoundByUserId ,NotFoundByProductId,NotFoundById};
