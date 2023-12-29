class UserBadRequestException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

class UserPhoneAlreadyExists extends Error {
  constructor() {
    super("User phone already exist");

    this.statusCode = 409;
  }
}

class LoginOrPassWrongException extends Error {
  constructor() {
    super("Phone number or password  wrong");

    this.statusCode = 400;
  }
}

class UserNotFound extends Error {
  constructor() {
    super("User not found");

    this.statusCode = 404;
  }
}

module.exports = {
  UserBadRequestException,
  LoginOrPassWrongException,
  UserNotFound,
  UserPhoneAlreadyExists,
};
