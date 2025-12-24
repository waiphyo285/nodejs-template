const utils = require('@utils/index')
const Controller = require('@controllers/generator')
const { handleServiceResponse } = require('@utils/handlers/response')

class ControllerHandler {
    static find(req, res, next) {
        const resultPromise = Controller.find(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const resultPromise = Controller.findById(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findBy(req, res, next) {
        const resultPromise = Controller.findBy(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        const resultPromise = Controller.create(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res, next) {
        const resultPromise = Controller.update(req.params.id, req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static drop(req, res, next) {
        const resultPromise = Controller.drop(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = ControllerHandler
