const joi = require("joi");

const userScheme = joi.object({
  phone: joi
    .number()
    .min(100000000)
    .max(999999999)
    .integer()
    .positive()
    .required(),
  password: joi.string().required(),
  fullName: joi.string().required(),
});

module.exports = { userScheme };
