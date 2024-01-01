const joi = require("joi");

const notificationScheme = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  userId: joi.string(),
  isGlobal: joi.boolean(),
  isRead: joi.boolean().invalid(false),
});



module.exports = { notificationScheme };
