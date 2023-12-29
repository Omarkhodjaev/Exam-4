const joi = require("joi");

const userScheme = joi.object({
  phone: joi.number().min(9).required(),
  password: joi.string().required(),
  fullName: joi.string().required(),
});

module.exports = { userScheme };
