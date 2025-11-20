const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        username: joi
            .string()
            .regex(/^[a-z0-9]*$/)
            .min(8)
            .max(16)
            .required(),
        password: joi
            .string()
            .regex(/^[a-z0-9]*$/)
            .min(8)
            .max(16)
            .required(),
        user_type: joi.string().allow(null),
    })
    .unknown(true)
