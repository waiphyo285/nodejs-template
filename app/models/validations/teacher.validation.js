const Joi = require('joi');

/**
 * Teacher Validation Schemas
 */
const schemas = {
    create: Joi.object({
        name: Joi.string()
            .required(),
        age: Joi.number(),
        degree: Joi.string(),
    }).unknown(true),

    update: Joi.object({
        name: Joi.string(),
        age: Joi.number(),
        degree: Joi.string(),
    }).unknown(true),

    idWithData: Joi.object({
        id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        data: Joi.object({
            name: Joi.string(),
            age: Joi.number(),
            degree: Joi.string(),
        })
    }).unknown(true)
};

module.exports = schemas;


