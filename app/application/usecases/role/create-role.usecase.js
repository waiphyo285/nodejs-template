const BaseUseCase = require('../base.usecase');
const userRoleSchemas = require('@models/validations/user-role.validation');

/**
 * Create User Role Use Case
 */
class CreateUserRoleUseCase extends BaseUseCase {
    constructor(userRoleService) {
        super();
        this.userRoleService = userRoleService;
        this.schema = userRoleSchemas.create;
    }

    async handle(request) {
        return this.userRoleService.createRole(request);
    }
}

module.exports = CreateUserRoleUseCase;

