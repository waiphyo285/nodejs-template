const Joi = require('joi');

/**
 * User Role Validation Schemas
 */
const schemas = {
    create: Joi.object({
        role: Joi.string().required(),
        level: Joi.string().required(),
        program: Joi.array()
            .items(
                Joi.object({
                    menuid: Joi.string(),
                    access: Joi.string(),
                    submenu: Joi.array().items(
                        Joi.object({
                            menuid: Joi.string(),
                            access: Joi.string(),
                            read: Joi.string(),
                            edit: Joi.string(),
                            delete: Joi.string(),
                        })
                    ).default([]),
                }).unknown(true)
            )
            .default([]),
    }).unknown(true),

    update: Joi.object({
        role: Joi.string(),
        level: Joi.string(),
        program: Joi.array().items(Joi.object().unknown(true))
    }).unknown(true),

    idWithData: Joi.object({
        id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        data: Joi.object({
            role: Joi.string(),
            level: Joi.string(),
            program: Joi.array().items(Joi.object().unknown(true))
        })
    }).unknown(true)
};

module.exports = schemas;

