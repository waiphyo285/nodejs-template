const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Get User Role By ID Use Case
 */
class GetUserRoleByIdUseCase extends BaseUseCase {
    constructor(userRoleService) {
        super();
        this.userRoleService = userRoleService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        return this.userRoleService.getRoleById(request.id);
    }
}

module.exports = GetUserRoleByIdUseCase;

