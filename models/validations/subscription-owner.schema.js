const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        plan_id: joi.string().required(),
    })
    .unknown(true)
