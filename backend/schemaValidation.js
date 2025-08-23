const Joi = require("joi");

const listingSchemaValidation = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        by: Joi.string().allow("", null)
    }).required()
});

const reviewSchemaValidation = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        review: Joi.string().required(),
        by: Joi.string().required()
    }).required()
})

const userSchemaValidation = Joi.object({
    user: Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().pattern(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{8,}/).required().messages({
            "string.pattern.base": "Password must contain at least 8 characters | ABC | abc | 123 | @#$%"
        })
    }).required()
});

module.exports = {
    listingSchemaValidation,
    userSchemaValidation,
    reviewSchemaValidation
}