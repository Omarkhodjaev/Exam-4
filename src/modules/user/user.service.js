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
const { userFindById } = require("../../library/userFindById.js");
const { fetchAll, fetch } = require("../../library/pg.js");

class UserService {
  async register(dto) {
    const hashedPassword = await hashed(dto.password);

    const newUser = await fetchAll(
      `INSERT INTO users (phone, password, full_name, role) VALUES ($1, $2, $3, $4) returning *`,
      dto.phone,
      hashedPassword,
      dto.fullName,
      "user"
    );

    const newToken = jwtSign(newUser[0].id);

    const resData = new ResData("Successfully registered", 201, {
      user: newUser,
      token: newToken,
    });

    return resData;
  }

  async registerForAdmin(dto) {
    const hashedPassword = await hashed(dto.password);

    const newUser = await fetchAll(
      `INSERT INTO users (phone, password, full_name, role) VALUES ($1, $2, $3, $4) returning *`,
      dto.phone,
      hashedPassword,
      dto.fullName,
      "admin"
    );

    const newToken = jwtSign(newUser[0].id);

    const resData = new ResData("Successfully registered", 201, {
      user: newUser,
      token: newToken,
    });

    return resData;
  }

  async login(dto) {
    const foundUser = await fetchAll(
      `select * from users where phone = '${dto.phone}'`
    );

    if (foundUser.length == 0) {
      throw new LoginOrPassWrongException();
    }

    const isValidPassword = await isValid(dto.password, foundUser[0].password);

    if (!isValidPassword) {
      throw new LoginOrPassWrongException();
    }

    const newToken = jwtSign(foundUser[0].id);

    const resData = new ResData("Successfully logged in", 200, {
      user: foundUser,
      token: newToken,
    });

    return resData;
  }

  async getAllUsers() {
    const users = await fetchAll(`select * from users`);

    const resData = new ResData("All users are taken", 200, { users });
    return resData;
  }

  async getUserById(userId) {
    const foundUserById = await fetchAll(
      `select * from users where id = '${userId}'`
    );

    if (!foundUserById.length) {
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

  async deleteUser(userId) {
  
    const foundUser = await fetchAll(
      `DELETE from users
      WHERE id = '${userId}'
      RETURNING *`
    );


   
    const resData = new ResData("User deleted", 200, foundUser);
    return resData;
  }

  async updateUser(dto, userId) {
    const foundUser = await fetch(`
    SELECT *
    FROM users
    WHERE id = '${userId}';`);

    if (foundUser.length == 0) {
      throw new UserNotFound();
    }

    const hashedPassword = await hashed(dto.password);
    const newFullName = dto.fullName;
    const newPhone = dto.phone;

    const updatedUser = await fetchAll(
      `
        UPDATE users
        SET password = $1, full_name = $2, phone = $3 
        WHERE id = $4;
        `,
      [hashedPassword, newFullName, newPhone, userId]
    );

    const resData = new ResData("User updated", 200, updatedUser);
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
