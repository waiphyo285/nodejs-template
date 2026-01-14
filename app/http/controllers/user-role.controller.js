const { BaseController, execute } = require('./base.controller')

class UserRoleController extends BaseController {
    constructor() {
        super({
            entityName: 'Role',
            useCaseMap: {
                find: 'findRolesUseCase',
                findById: 'getRoleByIdUseCase',
                create: 'createRoleUseCase',
                update: 'updateRoleUseCase',
                delete: 'deleteRoleUseCase'
            }
        })
    }

    config(req, res) {
        execute('findRolesUseCase')
            .with({})
            .send(res)
    }

    toRouteHandlers() {
        return {
            ...super.toRouteHandlers(),
            config: (req, res) => this.config(req, res)
        }
    }
}

module.exports = new UserRoleController().toRouteHandlers()
