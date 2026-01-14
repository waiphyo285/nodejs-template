const Joi = require('joi')
const utils = require('@utils/index')
const clr = require('@utils/config/logcolor.config')
const { createApiResponse } = require('@utils/handlers/response.handler')

/**
 * Middleware to validate request data against a Joi schema.
 * 
 * @param {Object} schema - Joi schema object
 * @param {String} property - Optional description for logging
 */
const isValidData = (schema, property) => {
    return (req, res, next) => {
        if (!schema) {
            console.warn(`${clr.fg.red} Validation Error: No schema provided for validation.`);
            return next();
        }

        !utils.isEmpty(req.body) &&
            iamlog.info('Validate body ', JSON.stringify(req.body))

        // Use schema.validate (modern) instead of joi.validate (deprecated)
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
            allowUnknown: true
        })

        // Replace req.body with validated/stripped value
        req.body = value;

        const locales = res.locals.i18n.translations

        if (error) {
            const { details } = error
            const message = details.map((i) => i.message).join(',')

            console.error(`${clr.fg.yellow} Validation Failed:`, message)

            return res.status(422).json(
                createApiResponse(422, { data: { message } }, locales)
            )
        }

        next()
    }
}

module.exports = isValidData
