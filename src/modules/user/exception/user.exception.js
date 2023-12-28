class UserBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class LoginOrPassWrongException extends Error {
  constructor() {
    super("login or password is wrong");

    this.statusCode = 400;
  }
}

class UserNotFound extends Error {
  constructor() {
    super("User not found");

    this.statusCode = 404;
  }
}

class UserIdMustBeRequired extends Error {
  constructor() {
    super("User ID must be required");

    this.statusCode = 400;
  }
}

module.exports = {
  UserBadRequestException,
  LoginOrPassWrongException,
  UserNotFound,
  UserIdMustBeRequired
};
