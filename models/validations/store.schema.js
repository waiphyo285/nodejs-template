const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        store_type_id: joi.string().length(24).allow(null),
        owner_id: joi.string().length(24).allow(null),
        city_id: joi.string().length(24).allow(null),
        township_id: joi.string().length(24).allow(null),
        name: joi.string().required(),
        email: joi
            .string()
            .email({ tlds: { allow: false } })
            .required(),
        phone_1: joi.string().min(9).max(14).regex(/^\d+$/).required(),
    })
    .unknown(true)
