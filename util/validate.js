const joi = require("joi");

//create or add validation
const validateRegister = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    activation_code: joi.string().min(3).required(),
    password: joi
      .string()
      .min(4)
      .regex(/[a-zA-Z0-9]+/)
      .required(),
    repeat_password: joi.any().valid(joi.ref("password")).required(),
  });
  return schema.validate(data);
};

//Login validation
const validateLogin = (data) => {
  const schema = joi
    .object({
      email: joi.string().required().email(),
      password: joi.string().min(4).required(),
    })
    .unknown(true);
  return schema.validate(data);
};
;

//Exports both methods
module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;

