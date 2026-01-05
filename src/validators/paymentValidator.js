const Joi = require("joi");

const createPaymentValidator = Joi.object({
    order: Joi.string().length(24).required(),
    paymentMethod: Joi.string().required(),
    amount: Joi.number().positive().required(),
    transactionId: Joi.string().optional(),
});

const updatePaymentValidator = Joi.object({
    status: Joi.string().valid("pending", "success", "failed").optional(),
    transactionId: Joi.string().optional(),
});

module.exports = {
    createPaymentValidator,
    updatePaymentValidator,
};
