const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        owner_id: joi.string().length(24).required(),
        store_id: joi.string().length(24).required(),
        max_times: joi.number().default(0),
        current_times: joi.number().default(0),
        // expired_at: joi.date().allow(null).default(null),
    })
    .unknown(true)
