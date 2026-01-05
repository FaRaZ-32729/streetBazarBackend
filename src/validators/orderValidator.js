const Joi = require("joi");

const orderItemSchema = Joi.object({
    product: Joi.string().length(24).required(),
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().integer().min(1).required(),
    size: Joi.string().optional(),
    color: Joi.string().optional(),
});

const createOrderValidator = Joi.object({
    orderItems: Joi.array().items(orderItemSchema).min(1).required(),
    shippingAddress: Joi.string().min(10).required(),
    paymentMethod: Joi.string()
        .valid("COD", "Stripe", "JazzCash", "Easypaisa")
        .required(),
    itemsPrice: Joi.number().required(),
    shippingPrice: Joi.number().required(),
    taxPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
});

const updateOrderValidator = Joi.object({
    status: Joi.string()
        .valid("Pending", "Processing", "Shipped", "Delivered", "Cancelled")
        .optional(),
    isPaid: Joi.boolean().optional(),
    paymentResult: Joi.object({
        id: Joi.string().optional(),
        status: Joi.string().optional(),
    }).optional(),
    paidAt: Joi.date().optional(),
    deliveredAt: Joi.date().optional(),
});

module.exports = {
    createOrderValidator,
    updateOrderValidator,
};
