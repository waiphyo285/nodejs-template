const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        plan_type: joi.string().required(),
    })
    .unknown(true)
