const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required",
        }),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});


module.exports = { loginSchema, changePasswordSchema };