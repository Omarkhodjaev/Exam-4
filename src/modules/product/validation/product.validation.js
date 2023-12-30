const joi = require("joi");

const productScheme = joi.object({
  fileId: joi.string().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
});

const productEditScheme = joi.object({
  fileId: joi.string().required(),
  title: joi.string().required(),
  description: joi.string().required(),
});

module.exports = { productScheme,productEditScheme };
