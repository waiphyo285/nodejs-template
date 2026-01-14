const serialize = require('./serializer')
const { handleServiceResponse } = require('@utils/handlers/response.handler')
const container = require('@infrastructure/container/bootstrap')

/**
 * Use Case Executor - API for clean use case execution
 */
class UseCaseExecutor {
    constructor(useCaseName) {
        this.useCase = container.get(useCaseName)
        this.payload = {}
        this.transformFn = null
        this.successFn = null
    }

    with(payload) {
        this.payload = payload
        return this
    }

    transform(fn) {
        this.transformFn = fn
        return this
    }

    onSuccess(fn) {
        this.successFn = fn
        return this
    }

    send(res) {
        const resultPromise = this.useCase.execute(this.payload).then((result) => {
            if (!result.success) throw new Error(result.error)

            if (this.successFn) this.successFn(result)

            const data = this.transformFn
                ? this.transformFn(result.data)
                : result.data

            return serialize(data)
        })
        handleServiceResponse(resultPromise, res)
    }
}

/**
 * Factory function - entry point for fluent execution
 */
const execute = (useCaseName) => new UseCaseExecutor(useCaseName)

/**
 * Base Controller Factory
 */
class BaseController {
    constructor(config) {
        this.entityName = config.entityName

        this.useCaseMap = {
            find: `find${config.entityName}sUseCase`,
            findById: `get${config.entityName}ByIdUseCase`,
            create: `create${config.entityName}UseCase`,
            update: `update${config.entityName}UseCase`,
            delete: `delete${config.entityName}UseCase`,
            ...config.useCaseMap
        }

        this.hooks = { ...config.hooks }
    }

    find(req, res) {
        execute(this.useCaseMap.find)
            .with(req.query)
            .send(res)
    }

    findById(req, res) {
        execute(this.useCaseMap.findById)
            .with({ id: req.params.id })
            .send(res)
    }

    findBy(req, res) {
        execute(this.useCaseMap.find)
            .with(req.query)
            .send(res)
    }

    create(req, res) {
        execute(this.useCaseMap.create)
            .with(req.body)
            .send(res)
    }

    update(req, res) {
        execute(this.useCaseMap.update)
            .with({ id: req.params.id, data: req.body })
            .send(res)
    }

    drop(req, res) {
        execute(this.useCaseMap.delete)
            .with({ id: req.params.id })
            .transform(() => ({ message: `${this.entityName} deleted successfully` }))
            .send(res)
    }

    toRouteHandlers() {
        return {
            find: (req, res) => this.find(req, res),
            findById: (req, res) => this.findById(req, res),
            findBy: (req, res) => this.findBy(req, res),
            create: (req, res) => this.create(req, res),
            update: (req, res) => this.update(req, res),
            drop: (req, res) => this.drop(req, res)
        }
    }
}

function createController(entityName, options = {}) {
    return new BaseController({ entityName, ...options }).toRouteHandlers()
}

module.exports = { BaseController, createController, execute }
