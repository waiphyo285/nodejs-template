const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        cityid: joi.string().length(24).required(),
        township_mm: joi.string().required(),
    })
    .unknown(true)
