const joi = require('joi')

const crOrderSchema = joi
    .object()
    .keys({
        item_id: joi.string().length(24).required(),
    })
    .unknown(true)

const updOrderSchema = joi
    .object({
        itemList: joi
            .array()
            .items(
                joi.object({
                    item_id: joi.string().hex().length(24).required(),
                    quantity: joi.string().regex(/^\d+$/).required(),
                })
            )
            .required(),
    })

    .unknown(true)

const payOrderSchema = joi
    .object({
        paymethod_id: joi.string().hex().length(24).required(),
        remark: joi.string().allow('').required(),
        promo_code: joi.string().allow('').required(),
        printed: joi.string().valid('0', '1').required(),
    })
    .unknown(true)

module.exports = { crOrderSchema, updOrderSchema, payOrderSchema }
