const Joi = require('joi');

/**
 * Student Validation Schemas
 */
const schemas = {
    create: Joi.object({
        name: Joi.string()
            .required(),
        age: Joi.number(),
        grade: Joi.number(),
        images: Joi.array()
            .items(Joi.string()),

        remove_images: Joi.array()
            .items(Joi.string()),
    }).unknown(true),

    update: Joi.object({
        name: Joi.string(),
        age: Joi.number(),
        grade: Joi.number(),
        images: Joi.array().items(Joi.string()),
        remove_images: Joi.array().items(Joi.string()),
    }).unknown(true),

    idWithData: Joi.object({
        id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        data: Joi.object({
            name: Joi.string(),
            age: Joi.number(),
            grade: Joi.number(),
            images: Joi.array().items(Joi.string()),
            remove_images: Joi.array().items(Joi.string()),
        })
    }).unknown(true)
};

module.exports = schemas;

