const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Get User By ID Use Case
 */
class GetUserByIdUseCase extends BaseUseCase {
    constructor(userService) {
        super();
        this.userService = userService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        return this.userService.getUserById(request.id);
    }
}

module.exports = GetUserByIdUseCase;


