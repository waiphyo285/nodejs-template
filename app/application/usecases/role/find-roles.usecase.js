const BaseUseCase = require('../base.usecase');

/**
 * Find Roles Use Case
 */
class FindRolesUseCase extends BaseUseCase {
    constructor(roleService) {
        super();
        this.roleService = roleService;
    }

    async handle(request) {
        return this.roleService.findRoles(request);
    }
}

module.exports = FindRolesUseCase;
