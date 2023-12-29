const { ResData } = require("../../library/resData");
const path = require("path");
const { DataSource } = require("../../library/dataSource.js");
const User = require("./entity/user.entity.js");
const {
  UserNotFound,
  UserPhoneAlreadyExists,
  LoginOrPassWrongException,
} = require("./exception/user.exception");
const uuid = require("uuid");
const { hashed, isValid } = require("../../library/bycript.js");
const { jwtSign } = require("../../library/jwt.js");
const { userFindById } = require("../../library/userFoundById.js");

class UserService {
  async register(dto) {
    const userPath = path.join(__dirname, "../../../database", "users.json");
    const usersDataSource = new DataSource(userPath);
    const users = usersDataSource.read();

    const foundUserByPhone = await this.#_findUserByPhone(dto.phone);

    if (foundUserByPhone) {
      throw new UserPhoneAlreadyExists();
    }

    const hashedPassword = await hashed(dto.password);

    const generatedId = uuid.v4();

    const newUser = new User(
      generatedId,
      dto.phone,
      hashedPassword,
      dto.fullName
    );

    users.push(newUser);
    usersDataSource.write(users);

    const newToken = jwtSign(newUser.id);

    const resData = new ResData("Successfully registered", 201, {
      user: newUser,
      token: newToken,
    });

    return resData;
  }

  async registerForAdmin(dto) {
    const userPath = path.join(__dirname, "../../../database", "users.json");
    const usersDataSource = new DataSource(userPath);
    const users = usersDataSource.read();

    const foundUserByPhone = await this.#_findUserByPhone(dto.phone);

    if (foundUserByPhone) {
      throw new UserPhoneAlreadyExists();
    }

    const hashedPassword = await hashed(dto.password);

    const generatedId = uuid.v4();

    const newUser = new User(
      generatedId,
      dto.phone,
      hashedPassword,
      dto.fullName,
      "admin"
    );
    +users.push(newUser);
    usersDataSource.write(users);

    const newToken = jwtSign(newUser.id);

    const resData = new ResData("Successfully registered", 201, {
      user: newUser,
      token: newToken,
    });

    return resData;
  }

  async login(dto) {
    const foundUser = this.#_findUserByPhone(dto.phone);

    if (!foundUser) {
      throw new LoginOrPassWrongException();
    }

    const isValidPassword = await isValid(dto.password, foundUser.password);

    if (!isValidPassword) {
      throw new LoginOrPassWrongException();
    }

    const newToken = jwtSign(foundUser.id);

    const resData = new ResData("Successfully logged in", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  getAllUsers() {
    const userPath = path.join(__dirname, "../../../database", "users.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const resData = new ResData("All users are taken", 200, { users });
    return resData;
  }

  getUserById(userId) {
    const foundUserById = userFindById(userId);

    if (!foundUserById) {
      throw new UserNotFound();
    }

    const resData = new ResData(
      "User is taken by ID",
      200,
      foundUserById,
      userId
    );
    return resData;
  }

  deleteUser(userId) {
    const { data: foundUser } = this.getUserById(userId);

    const userPath = path.join(__dirname, "../../../database", "users.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const filterUsers = users.filter((user) => user.id !== foundUser.id);

    userDataSource.write(filterUsers);

    const resData = new ResData("User deleted", 200, foundUser);
    return resData;
  }

  async updateUser(dto, userId) {
    const { data: foundUser } = this.getUserById(userId);

    const hashedPassword = await hashed(dto.password);

    const foundUserByPhone = this.#_findUserByPhone(dto.phone);
    if (foundUserByPhone) {
      throw new UserPhoneAlreadyExists();
    }

    foundUser.password = hashedPassword;
    foundUser.full_name = dto.fullName;
    foundUser.phone = dto.phone;

    const userPath = path.join(__dirname, "../../../database", "users.json");
    const userDataSource = new DataSource(userPath);
    const users = userDataSource.read();

    const filterUsers = users.filter((user) => user.id !== foundUser.id);

    filterUsers.push(foundUser);
    userDataSource.write(filterUsers);

    const resData = new ResData("User updated", 200, foundUser);
    return resData;
  }

  #_findUserByPhone(phone) {
    const userPath = path.join(__dirname, "../../../database", "users.json");
    const usersDataSource = new DataSource(userPath);
    const users = usersDataSource.read();

    const foundUserByPhone = users.find((user) => user.phone === phone);
    return foundUserByPhone;
  }
}

module.exports = { UserService };
