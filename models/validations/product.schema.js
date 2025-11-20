const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        owner_id: joi.string().length(24).required(),
        store_id: joi.string().length(24).allow(null),

        category_id: joi.string().length(24).allow(null),
        sub_category_id: joi.string().length(24).allow(null),

        name: joi.string().required(),
        type: joi.string().valid('standard', 'service'),

        barcode: joi.string().allow(''),
        barcode_sym: joi.string().valid('code128', 'code39'),

        cost: joi.number().min(0).required(),
        retail_price: joi.number().min(0).required(),
        wholesale_price: joi.number().min(0).required(),

        tax_percent: joi.number().min(0).required(),
        tax_method: joi.string().valid('inclusive', 'exclusive'),

        is_variant: joi.string().valid('1', '0').allow(''),
    })
    .unknown(true)
