const { Router } = require("express");
const user = require("./user/user.module.js");

const router = Router();

router.use("/user", user.router);

module.exports = { router };
