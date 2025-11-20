const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        name: joi.string().required(),
        sign: joi.string().required(),
    })
    .unknown(true)
