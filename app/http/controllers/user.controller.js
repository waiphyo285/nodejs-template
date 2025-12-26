const serialize = require('./serializer')
const { handleServiceResponse } = require('@utils/handlers/response.handler')
const container = require('@infrastructure/container/bootstrap')
const socketClient = require('../../socket-client')

class UserController {
    static find(req, res, next) {
        const useCase = container.get('findUsersUseCase')
        const resultPromise = useCase.execute(req.query).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, res)
    }

    static findById(req, res, next) {
        const useCase = container.get('getUserByIdUseCase')
        const resultPromise = useCase
            .execute({ id: req.params.id })
            .then((result) => {
                if (result.success) {
                    return serialize(result.data)
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, res)
    }

    static create(req, res, next) {
        const useCase = container.get('createUserUseCase')
        const resultPromise = useCase.execute(req.body).then((result) => {
            if (result.success) {
                return serialize(result.data)
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, res)
    }

    static remove(req, res, next) {
        socketClient.send(req.body.id)
        const useCase = container.get('deleteUserUseCase')
        const resultPromise = useCase
            .execute({ id: req.body.id })
            .then((result) => {
                if (result.success) {
                    return serialize({ message: result.message })
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, res)
    }

    static updateWithPass(req, res, next) {
        const useCase = container.get('updateUserUseCase')
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
        handleServiceResponse(resultPromise, res)
    }

    static updateWithoutPass(req, res, next) {
        const useCase = container.get('updateUserUseCase')
        const resultPromise = useCase
            .execute({
                id: req.params.id,
                data: req.body,
            })
            .then((result) => {
                if (result.success) {
                    req.user.theme = result.data.theme
                    req.user.locale = result.data.locale
                    return serialize(result.data)
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, res)
    }

    static drop(req, res, next) {
        const useCase = container.get('deleteUserUseCase')
        const resultPromise = useCase
            .execute({ id: req.params.id })
            .then((result) => {
                if (result.success) {
                    return serialize({ message: result.message })
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, res)
    }
}

module.exports = UserController
