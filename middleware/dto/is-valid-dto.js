const joi = require('joi')
const clr = require('@utils/config/logcolor')
const { createResponse } = require('@utils/handlers/response')

const isValidData = (schema, property) => {
    return (req, res, next) => {
        iamlog.info('Validate body ', req.body)
        iamlog.info('Validate schema ', property)

        const { error } = joi.validate(req.body, schema)
        const locales = res.locals.i18n.translations

        const prev = () => {
            const { details } = error
            const message = details.map((i) => i.message).join(',')

            console.error(`${clr.fg.yellow} `, message)

            res.status(422).json(
                createResponse(422, { data: { message } }, locales)
            )
        }
        error === null ? next() : prev()
    }
}

module.exports = isValidData
