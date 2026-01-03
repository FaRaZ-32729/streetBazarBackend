const Joi = require("joi");

const addProductSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().positive().required(),
    discountPrice: Joi.number().positive().less(Joi.ref("price")).optional(),
    category: Joi.string().required(),
    sizes: Joi.array().items(Joi.string()).optional(),
    colors: Joi.array().items(Joi.string()).optional(),
    stock: Joi.number().integer().min(0).required(),
});

const updateProductSchema = Joi.object({
    name: Joi.string().trim().min(3).optional(),
    description: Joi.string().trim().min(10).optional(),
    price: Joi.number().positive().optional(),
    discountPrice: Joi.number()
        .positive()
        .less(Joi.ref("price"))
        .optional(),
    category: Joi.string().hex().length(24).optional(),
    sizes: Joi.array().items(Joi.string()).optional(),
    colors: Joi.array().items(Joi.string()).optional(),
    stock: Joi.number().integer().min(0).optional(),

    // client can send image names to remove
    removedImages: Joi.array().items(Joi.string()).optional(),
});

module.exports = { addProductSchema, updateProductSchema };
