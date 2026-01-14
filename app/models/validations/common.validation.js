const Joi = require('joi');

/**
 * Common Validation Schemas
 * Reusable schemas across all use cases
 */
const commonSchemas = {
    id: Joi.object({
        id: Joi.alternatives().try(Joi.string(), Joi.number()).required()
    }),

    idWithData: Joi.object({
        id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        data: Joi.object().required()
    })
};

module.exports = commonSchemas;
