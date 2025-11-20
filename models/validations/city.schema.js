const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        city_mm: joi.string().required(),
    })
    .unknown(true)
