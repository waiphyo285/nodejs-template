const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        owner_id: joi.string().length(24).required(),
        name: joi.string().required(),
    })
    .unknown(true)
