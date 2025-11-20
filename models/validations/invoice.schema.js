const joi = require('joi')

const purInvoiceSchema = joi
    .object({
        purchased_at: joi
            .string()
            .regex(/^\d{2}\/\d{2}\/\d{4}$/)
            .required(),
        store_id: joi.string().hex().length(24).required(),
        supplier_id: joi.string().hex().length(24).required(),
        state: joi.string().valid('Draft', 'Opened', 'Paid').required(),
        purchase_items: joi
            .array()
            .items(
                joi.object({
                    item_id: joi.string().hex().length(24).required(),
                    quantity: joi.number().integer().min(1).required(),
                    retail_price: joi.number().min(0).required(),
                })
            )
            .required(),
    })
    .unknown(true)

const dmgInvoiceSchema = joi
    .object({
        damaged_at: joi
            .string()
            .regex(/^\d{2}\/\d{2}\/\d{4}$/)
            .required(),
        store_id: joi.string().hex().length(24).required(),
        // staff_id: joi.string().hex().length(24).required(),
        state: joi.string().valid('Draft', 'Opened', 'Paid').required(),
        damage_items: joi
            .array()
            .items(
                joi.object({
                    item_id: joi.string().hex().length(24).required(),
                    quantity: joi.number().integer().min(1).required(),
                    retail_price: joi.number().min(0).required(),
                })
            )
            .required(),
    })
    .unknown(true)

const adjInvoiceSchema = joi
    .object({
        adjusted_at: joi
            .string()
            .regex(/^\d{2}\/\d{2}\/\d{4}$/)
            .required(),
        store_id: joi.string().hex().length(24).required(),
        // staff_id: joi.string().hex().length(24).required(),
        state: joi.string().valid('Draft', 'Opened', 'Paid').required(),
        adjust_items: joi
            .array()
            .items(
                joi
                    .object({
                        type: joi.string().valid('Add', 'Less').required(),
                        item_id: joi.string().hex().length(24).required(),
                        quantity: joi.number().integer().min(1).required(),
                        retail_price: joi.number().min(0).required(),
                    })
                    .unknown(true)
            )
            .required(),
    })
    .unknown(true)

module.exports = { purInvoiceSchema, dmgInvoiceSchema, adjInvoiceSchema }
