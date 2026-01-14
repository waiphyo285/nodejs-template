const Joi = require('joi');

/**
 * User Validation Schemas
 * Centralized source of truth for all user-related validation.
 */
const schemas = {
    create: Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email(),
        user_type: Joi.string().allow(null),
        role_id: Joi.string(),
        level_id: Joi.string(),
    }).unknown(true),

    update: Joi.object({
        username: Joi.string().alphanum().min(3).max(30),
        password: Joi.string().min(6),
        email: Joi.string().email(),
        user_type: Joi.string().allow(null),
        role_id: Joi.string(),
        level_id: Joi.string(),
    }).unknown(true),

    idWithData: Joi.object({
        id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        data: Joi.object({
            username: Joi.string().alphanum().min(3).max(30),
            password: Joi.string().min(6),
            email: Joi.string().email(),
            user_type: Joi.string().allow(null),
            role_id: Joi.string(),
            level_id: Joi.string(),
        })
    }).unknown(true)
};

module.exports = schemas;

