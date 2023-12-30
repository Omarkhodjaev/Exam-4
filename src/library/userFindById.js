const path = require("path");
const { DataSource } = require("./dataSource");
const { UserNotFound } = require("../modules/user/exception/user.exception");

const userFindById = (userId) => {
  const userPath = path.join(__dirname, "../../database", "users.json");
  const userDataSource = new DataSource(userPath);
  const users = userDataSource.read();

  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    throw new UserNotFound();
  }

  return foundUser;
};

module.exports = { userFindById };
