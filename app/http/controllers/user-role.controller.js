const serialize = require('./serializer')
const { handleServiceResponse } = require('@utils/handlers/response.handler')
const container = require('@infrastructure/container/bootstrap')
const utils = require('@utils/index')

class UserRoleController {
    static config(req, res, next) {
        const useCase = container.get('findRolesUseCase')
        const resultPromise = useCase.execute({}).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static find(req, res, next) {
        const useCase = container.get('findRolesUseCase')
        const resultPromise = useCase.execute(req.query).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static findById(req, res, next) {
        const useCase = container.get('getRoleByIdUseCase')
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
        const useCase = container.get('findRolesUseCase')
        const resultPromise = useCase.execute(req.query).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static create(req, res, next) {
        const useCase = container.get('createRoleUseCase')
        const resultPromise = useCase.execute(req.body).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res, next) {
        const useCase = container.get('updateRoleUseCase')
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
        const useCase = container.get('deleteRoleUseCase')
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

module.exports = UserRoleController
