/**
 * Bootstrap Container
 * Registers all services and dependencies.
 */
const path = require('path')
const Container = require('./Container')
const ContainerScanner = require('./scanner')
const GenericUseCase = require('@application/usecases/generic.usecase')

const container = new Container()
const scanner = new ContainerScanner(container)

// -----------------------------------------------------------------------------
// 1. Auto-Scan Repositories
// -----------------------------------------------------------------------------
scanner.scan(
    path.join(__dirname, '../repositories'),
    '.repository.js',
    (key, Module) => {
        container.register(key, () => new Module())
    }
)

// -----------------------------------------------------------------------------
// 2. Auto-Scan Domain Services
// -----------------------------------------------------------------------------
scanner.scan(
    path.join(__dirname, '../../domain/services'),
    '.service.js',
    (key, Module) => {
        const entityName = key.replace('Service', '')
        const repoKey = entityName + 'Repository'

        container.register(key, () => {
            const repo = container.get(repoKey)
            return new Module(repo)
        })
    }
)

// -----------------------------------------------------------------------------
// 3. Auto-Generate CRUD Use Cases
// -----------------------------------------------------------------------------
const entities = ['user', 'role', 'teacher', 'student',]
const actions = [
    { name: 'find', method: 'findAll', plural: true },
    { name: 'get', method: 'findById', suffix: 'ById' },
    { name: 'create', method: 'create' },
    { name: 'update', method: 'update' },
    { name: 'delete', method: 'delete' }
]

entities.forEach(entity => {
    const serviceKey = entity + 'Service'
    const pascalEntity = entity.charAt(0).toUpperCase() + entity.slice(1)

    actions.forEach(action => {
        let namePart = pascalEntity
        if (action.plural) {
            namePart = pascalEntity + 's'
        }
        if (action.suffix) {
            namePart += action.suffix
        }

        const useCaseKey = action.name + namePart + 'UseCase'

        container.register(useCaseKey, () => {
            return new GenericUseCase(container.get(serviceKey), action.method)
        })
    })
})

// -----------------------------------------------------------------------------
// 4. Custom Use Cases
// -----------------------------------------------------------------------------
scanner.scan(
    path.join(__dirname, '../../application/usecases'),
    '.usecase.js',
    (key, Module) => {
        if (['baseUseCase', 'genericUseCase'].includes(key)) return

        const match = key.match(/(create|update|delete|get|find)([A-Z][a-z]+)UseCase/i)
        let entityName = match ? match[2].toLowerCase() : 'user'

        if (entityName.endsWith('s')) {
            entityName = entityName.slice(0, -1)
        }

        const serviceKey = entityName + 'Service'

        container.register(key, () => new Module(container.get(serviceKey)))
    }
)

module.exports = container
