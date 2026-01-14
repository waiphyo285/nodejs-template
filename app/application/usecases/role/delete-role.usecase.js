const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Delete User Role Use Case
 */
class DeleteUserRoleUseCase extends BaseUseCase {
    constructor(userRoleService) {
        super();
        this.userRoleService = userRoleService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        await this.userRoleService.deleteRole(request.id);
        return { message: 'Role deleted successfully' };
    }
}

module.exports = DeleteUserRoleUseCase;

