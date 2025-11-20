const utils = require('@utils/index')
const UserRole = require('@controllers/user-roles')
const programConfig = require('@config/program/config.json')
const {
    createResponse,
    handleDatabase,
    handleError,
} = require('@utils/handlers/response')

const userRole = (module.exports = {})

userRole.config = (req, res, next) => {
    try {
        const role = req.user.role
        const filterProgram = programConfig.role.filter((config) =>
            config.who_access.includes(role)
        )
        const data = JSON.parse(JSON.stringify(filterProgram))
        const locales = res.locals.i18n.translations
        res.status(200).json(createResponse(200, { data: { data } }, locales))
    } catch (err) {
        console.error(`Error ${err}`)
        res.status(500).json(handleError(err, locales))
    }
}

userRole.index = (req, res, next) => {
    const getService = UserRole.listData(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.show = (req, res, next) => {
    const getService = UserRole.findDataById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.showBy = (req, res, next) => {
    const getService = UserRole.findDataBy(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.create = (req, res, next) => {
    req.body.who_access = req.user.user_type
    const getService = UserRole.addData(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.update = (req, res, next) => {
    const getService = UserRole.updateData(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.delete = (req, res, next) => {
    const getService = UserRole.deleteData(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

userRole.deleteAll = (req, res, next) => {
    UserRole.dropAll()
        .then((data) => res.send(data))
        .catch(next)
}
