const utils = require('@utils/index')
const UserRole = require('@controllers/user-role')
const programConfig = require('@config/config.json')
const {
    createApiResponse,
    handleServiceResponse,
    mapErrorToResponse,
} = require('@utils/handlers/response')

class UserRoleHandler {
    static config(req, res, next) {
        const locales = res.locals.i18n.translations
        try {
            const role = req.user.role
            const filterProgram = programConfig.role.filter((config) =>
                config.who_access.includes(role)
            )
            const data = JSON.parse(JSON.stringify(filterProgram))
            res.status(200).json(
                createApiResponse(200, { data: { data } }, locales)
            )
        } catch (err) {
            console.error(`Error ${err}`)
            res.status(500).json(mapErrorToResponse(err, locales))
        }
    }

    static find(req, res, next) {
        const resultPromise = UserRole.find(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const resultPromise = UserRole.findById(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findBy(req, res, next) {
        const resultPromise = UserRole.findBy(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        req.body.who_access = req.user.user_type
        const resultPromise = UserRole.create(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res, next) {
        const resultPromise = UserRole.update(req.params.id, req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static drop(req, res, next) {
        const resultPromise = UserRole.drop(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = UserRoleHandler
