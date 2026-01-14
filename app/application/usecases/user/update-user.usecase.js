const BaseUseCase = require('../base.usecase');
const userSchemas = require('@models/validations/user.validation');

/**
 * Update User Use Case
 */
class UpdateUserUseCase extends BaseUseCase {
    constructor(userService) {
        super();
        this.userService = userService;
        this.schema = userSchemas.idWithData;
    }

    async handle(request) {
        return this.userService.updateUserWithPassword(
            request.id,
            request.data
        );
    }
}

module.exports = UpdateUserUseCase;

