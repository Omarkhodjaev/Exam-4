const { Router } = require("express");
const user = require("./user/user.module.js");
const file = require("./file/file.module.js");
const product = require("./product/product.module.js");
const userProduct = require("./user-product/user-product.module.js");

const router = Router();

router.use("/user", user.router);
router.use("/file", file.router);
router.use("/product", product.router);
router.use("/user-product", userProduct.router);

module.exports = { router };
