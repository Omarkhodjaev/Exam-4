const joi = require("joi");

const userProductScheme = joi.object({
  productId: joi.string().required(),
  count: joi.number().min(1).integer().positive(),
});

module.exports = { userProductScheme };
