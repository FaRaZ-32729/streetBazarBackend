const Joi = require("joi");

const cartItemSchema = Joi.object({
    product: Joi.string().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
    size: Joi.string().optional(),
    color: Joi.string().optional(),
    price: Joi.number().optional(),
});

const createCartValidator = Joi.object({
    items: Joi.array().items(cartItemSchema).min(1).required(),
});

const updateCartValidator = Joi.object({
    items: Joi.array().items(cartItemSchema).min(1).required(),
});

module.exports = {
    createCartValidator,
    updateCartValidator,
};
