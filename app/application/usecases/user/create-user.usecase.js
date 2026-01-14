const BaseUseCase = require('../base.usecase');
const userSchemas = require('@models/validations/user.validation');

/**
 * Create User Use Case
 */
class CreateUserUseCase extends BaseUseCase {
    constructor(userService) {
        super();
        this.userService = userService;
        this.schema = userSchemas.create;
    }

    async handle(request) {
        return this.userService.createUser(request);
    }
}

module.exports = CreateUserUseCase;
