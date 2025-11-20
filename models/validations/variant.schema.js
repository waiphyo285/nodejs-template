const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        owner_id: joi.string().length(24).required(),
        store_id: joi.string().length(24).allow(null),

        product_id: joi.string().length(24).required(),

        category_id: joi.string().length(24).allow(null),
        sub_category_id: joi.string().length(24).allow(null),

        name: joi.string().required(),
        barcode: joi.string().allow(''),
        barcode_sym: joi.string().valid('code128', 'code39'),

        stock: joi.number().min(0).required(),

        cost: joi.number().min(0).required(),
        retail_price: joi.number().min(0).required(),
        wholesale_price: joi.number().min(0).required(),

        tax_percent: joi.number().min(0).required(),
        tax_method: joi.string().valid('inclusive', 'exclusive'),
    })
    .unknown(true)
