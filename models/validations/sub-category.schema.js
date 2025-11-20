const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        owner_id: joi.string().length(24).required(),
        category_id: joi.string().length(24).allow(null),
        name: joi.string().required(),
    })
    .unknown(true)
