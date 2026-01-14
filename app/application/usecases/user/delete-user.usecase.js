const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Delete User Use Case
 */
class DeleteUserUseCase extends BaseUseCase {
    constructor(userService) {
        super();
        this.userService = userService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        await this.userService.deleteUser(request.id);
        return { message: 'User deleted successfully' };
    }
}

module.exports = DeleteUserUseCase;


