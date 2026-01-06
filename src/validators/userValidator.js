const Joi = require("joi");

const registerAdminSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const registerUserSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  role: Joi.string().valid("admin", "customer").optional(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .optional(),
  address: Joi.string().optional(),
  role: Joi.string().valid("admin", "customer").optional(),
});

module.exports = { registerAdminSchema, registerUserSchema, updateUserSchema };
