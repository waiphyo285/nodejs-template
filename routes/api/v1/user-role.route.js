const programConfig = require('@config/config.json')
const UserRoleController = require('@controllers/user-role.controller')
const { createApiResponse, mapErrorToResponse } = require('@utils/handlers/response.handler')

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
            res.status(500).json(mapErrorToResponse(err, locales))
        }
    }

    static find(req, res, next) {
        UserRoleController.find(req, res, next)
    }

    static findById(req, res, next) {
        UserRoleController.findById(req, res, next)
    }

    static findBy(req, res, next) {
        UserRoleController.findBy(req, res, next)
    }

    static create(req, res, next) {
        req.body.who_access = req.user.user_type
        UserRoleController.create(req, res, next)
    }

    static update(req, res, next) {
        UserRoleController.update(req, res, next)
    }

    static drop(req, res, next) {
        UserRoleController.drop(req, res, next)
    }
}

module.exports = UserRoleHandler
