const utils = require('@utils/index')
const User = require('@controllers/user')
const { handleServiceResponse } = require('@utils/handlers/response')
const socketClient = require('../../../app/socket-client')

class UserHandler {
    static find(req, res, next) {
        const resultPromise = User.find(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const resultPromise = User.findById(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        const resultPromise = User.create(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static remove(req, res, next) {
        socketClient.send(req.body.id)
        const resultPromise = User.remove(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static updateWithPass(req, res, next) {
        const resultPromise = User.updateWithPass(req.params.id, req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static updateWithoutPass(req, res, next) {
        const resultPromise = User.updateWithoutPass(req.params.id, req.body)
        resultPromise.then((data) => {
            req.user.theme = data.data.theme
            req.user.locale = data.data.locale
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static drop(req, res, next) {
        const resultPromise = User.drop(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = UserHandler
