const Joi = require("joi");

const addCategorySchema = Joi.object({
    name: Joi.string().trim().min(3).required(),
    season: Joi.string().valid("Winter", "Summer", "All").optional(),
});

const updateCategorySchema = Joi.object({
    name: Joi.string().trim().min(3).optional(),
    season: Joi.string().valid("Winter", "Summer", "All").optional(),
});

module.exports = {
    addCategorySchema,
    updateCategorySchema,
};
