const serialize = require('./serializer')
const { handleServiceResponse } = require('@utils/handlers/response.handler')
const container = require('@infrastructure/container/bootstrap')
const utils = require('@utils/index')

class StudentController {
    static find(req, res, next) {
        const useCase = container.get('findStudentsUseCase')
        const resultPromise = useCase.execute(req.query).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const useCase = container.get('getStudentByIdUseCase')
        const resultPromise = useCase
            .execute({ id: req.params.id })
            .then((result) => {
                if (result.success) {
                    return serialize(result.data)
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findBy(req, res, next) {
        const useCase = container.get('findStudentsUseCase')
        const resultPromise = useCase.execute(req.query).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        const useCase = container.get('createStudentUseCase')
        const resultPromise = useCase.execute(req.body).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res, next) {
        const useCase = container.get('updateStudentUseCase')
        const resultPromise = useCase
            .execute({
                id: req.params.id,
                data: req.body,
            })
            .then((result) => {
                if (result.success) {
                    return serialize(result.data)
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static drop(req, res, next) {
        const useCase = container.get('deleteStudentUseCase')
        const resultPromise = useCase
            .execute({ id: req.params.id })
            .then((result) => {
                if (result.success) {
                    return serialize({ message: result.message })
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = StudentController
