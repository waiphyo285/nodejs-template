const utils = require('@utils/index')
const Student = require('@controllers/student')
const { handleServiceResponse } = require('@utils/handlers/response')

class StudentHandler {
    static find(req, res, next) {
        const resultPromise = Student.find(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const resultPromise = Student.findById(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findBy(req, res, next) {
        const resultPromise = Student.findBy(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        const resultPromise = Student.create(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res, next) {
        const resultPromise = Student.update(req.params.id, req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static drop(req, res, next) {
        const resultPromise = Student.drop(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = StudentHandler