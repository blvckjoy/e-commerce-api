const Joi = require("joi");

function validateUser(user) {
   const schema = Joi.object({
      username: Joi.string().min(5).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(15).required(),
      role: Joi.string().valid("admin", "basic").required(),
   });
   return schema.validate(user);
}

module.exports = { validateUser };
