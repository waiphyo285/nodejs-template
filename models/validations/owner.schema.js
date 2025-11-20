const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        account_id: joi.string().length(24).allow(null),
        owner_type_id: joi.string().length(24).allow(null),
        city_id: joi.string().length(24).allow(null),
        township_id: joi.string().length(24).allow(null),
        name: joi.string().required(),
        business_name: joi.string().required(),
        business_type: joi.string().valid('convenience', 'restaurant'),
        email: joi
            .string()
            .email({ tlds: { allow: false } })
            .required(),
        phone_1: joi.string().min(9).max(14).regex(/^\d+$/).required(),
    })
    .unknown(true)
