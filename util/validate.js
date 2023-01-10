const joi = require("joi");

//create admin validation
const validateCreateAdmin = (data) => {
  const schema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().min(4).required().email(),
    password: joi
      .string()
      .min(4)
      .regex(/[a-zA-Z0-9]+/)
      .required(),
  });
  return schema.validate(data);
};


//create employee validation
const validateCreateEmp = (data) => {
  const schema = joi.object({
    name: joi
      .string()
      .min(4)
      .required()
      .regex(/[a-zA-Z]+/),
    email: joi.string().min(4).required().email(),
    password: joi
      .string()
      .min(4)
      .regex(/[a-zA-Z0-9]+/)
      .required(),
    employee_phone: joi.number().min(8),
    employee_location: joi.string(),
    role_id: joi.number().min(1),
    department_id: joi.number().min(1),
    employee_salary: joi.string().required(),
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
module.exports.validateCreateAdmin = validateCreateAdmin;
module.exports.validateCreateEmp = validateCreateEmp;
module.exports.validateLogin = validateLogin;

