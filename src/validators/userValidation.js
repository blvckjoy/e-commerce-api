const Joi = require("joi");

function validateUser(user) {
   const schema = Joi.object({
      name: Joi.string().min(5).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string().length(8).required(),
   });
   return schema.validate(user);
}

module.exports = { validateUser };
