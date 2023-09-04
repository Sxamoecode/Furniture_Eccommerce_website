const Joi = require('joi');

// Using joi validation library to validate Users input
exports.userValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$'))
    .required(),
    email: Joi.string()
        .email()
        .required(),
    role: Joi.string()
});