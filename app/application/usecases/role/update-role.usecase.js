const BaseUseCase = require('../base.usecase');
const userRoleSchemas = require('@models/validations/user-role.validation');

/**
 * Update User Role Use Case
 */
class UpdateUserRoleUseCase extends BaseUseCase {
    constructor(userRoleService) {
        super();
        this.userRoleService = userRoleService;
        this.schema = userRoleSchemas.idWithData;
    }

    async handle(request) {
        return this.userRoleService.updateRole(
            request.id,
            request.data
        );
    }
}

module.exports = UpdateUserRoleUseCase;

