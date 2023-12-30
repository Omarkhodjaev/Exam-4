const { Router } = require("express");
const user = require("./user/user.module.js");
const file = require("./file/file.module.js");
const product = require("./product/product.module.js");

const router = Router();

router.use("/user", user.router);
router.use("/file", file.router);
router.use("/product", product.router);

module.exports = { router };
