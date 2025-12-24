const utils = require('@utils/index')
const Teacher = require('@controllers/teacher')
const { handleServiceResponse } = require('@utils/handlers/response')

class TeacherHandler {
    static find(req, res, next) {
        const resultPromise = Teacher.find(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const resultPromise = Teacher.findById(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findBy(req, res, next) {
        const resultPromise = Teacher.findBy(req.query)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        const resultPromise = Teacher.create(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res, next) {
        const resultPromise = Teacher.update(req.params.id, req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static drop(req, res, next) {
        const resultPromise = Teacher.drop(req.params.id)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = TeacherHandler