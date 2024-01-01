const joi = require("joi");

const userProductScheme = joi.object({
  productId: joi.string().required(),
  count: joi.number().min(1).integer().positive().required(),
});

const userProductUpdateScheme = joi.object({
  status: joi.string().valid('cancelled', 'bought').required(),
  count: joi.number().min(1).integer().positive().required(),
});

module.exports = { userProductScheme, userProductUpdateScheme };
