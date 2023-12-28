class User {
  constructor(id, phone, password, fullName, role = "user") {
    this.id = id;
    this.phone = phone;
    this.password = password;
    this.full_name = fullName;
    this.role = role;
  }
}

module.exports = User;
