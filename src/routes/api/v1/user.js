const utils = require('@utils/index')
const User = require('@controllers/users')
const { handleDatabase } = require('@utils/handlers/response')

const socketClient = require('../../../../socket-client')

const users = (module.exports = {})

users.index = (req, res, next) => {
    const getService = User.listUsers(req.query)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.show = (req, res, next) => {
    const getService = User.findUserById(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.create = (req, res, next) => {
    const getService = User.addUser(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.createUser = (req, res, next) => {
    const getService = User.createUser(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.removeUser = (req, res, next) => {
    socketClient.send(req.body.id)
    const getService = User.removeUser(req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.updateWithPass = (req, res, next) => {
    const getService = User.updateWithPass(req.params.id, req.body)
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.updateWithoutPass = (req, res, next) => {
    const getService = User.updateWithoutPass(req.params.id, req.body)
    getService.then((data) => {
        req.user.theme = data.data.theme
        req.user.locale = data.data.locale
    })
    handleDatabase(getService, utils.isEmptyObject, res)
}

users.delete = (req, res, next) => {
    const getService = User.deleteUser(req.params.id)
    handleDatabase(getService, utils.isEmptyObject, res)
}
