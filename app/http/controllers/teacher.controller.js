const serialize = require('./serializer')
const { handleServiceResponse } = require('@utils/handlers/response.handler')
const container = require('@infrastructure/container/bootstrap')
const utils = require('@utils/index')

class TeacherController {
    static find(req, res, next) {
        const useCase = container.get('findTeachersUseCase')
        const resultPromise = useCase.execute(req.query).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const useCase = container.get('getTeacherByIdUseCase')
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
        const useCase = container.get('findTeachersUseCase')
        const resultPromise = useCase.execute(req.query).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        const useCase = container.get('createTeacherUseCase')
        const resultPromise = useCase.execute(req.body).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res, next) {
        const useCase = container.get('updateTeacherUseCase')
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
        const useCase = container.get('deleteTeacherUseCase')
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

module.exports = TeacherController
