const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        owner_id: joi.string().length(24).required(),
        total_amount: joi.number().min(0).required(),
    })
    .unknown(true)
