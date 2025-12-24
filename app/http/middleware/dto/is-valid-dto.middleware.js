const joi = require('joi')
const utils = require('@utils/index')
const clr = require('@utils/config/logcolor.config')
const { createApiResponse } = require('@utils/handlers/response.handler')

const isValidData = (schema, property) => {
    return (req, res, next) => {
        !utils.isEmpty(req.body) &&
            iamlog.info('Validate body ', JSON.stringify(req.body))
        !utils.isEmpty(property) &&
            iamlog.info('Validate schema ', JSON.stringify(property))

        const { error } = joi.validate(req.body, schema)
        const locales = res.locals.i18n.translations

        const prev = () => {
            const { details } = error
            const message = details.map((i) => i.message).join(',')

            console.error(`${clr.fg.yellow} `, message)

            res.status(422).json(
                createApiResponse(422, { data: { message } }, locales)
            )
        }
        error === null ? next() : prev()
    }
}

module.exports = isValidData
