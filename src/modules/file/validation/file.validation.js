const joi = require("joi");

const fileScheme = joi.object({
  originalName: joi.string().required(),
});

module.exports = { fileScheme };
