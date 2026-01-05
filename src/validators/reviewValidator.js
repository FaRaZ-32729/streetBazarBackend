const Joi = require("joi");

const addReviewValidator = Joi.object({
    product: Joi.string().length(24).required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().allow("").optional(),
});

const updateReviewValidator = Joi.object({
    rating: Joi.number().min(1).max(5).optional(),
    comment: Joi.string().allow("").optional(),
});

module.exports = {
    addReviewValidator,
    updateReviewValidator,
};
