const BaseUseCase = require('../base.usecase');

/**
 * Find Users Use Case
 */
class FindUsersUseCase extends BaseUseCase {
    constructor(userService) {
        super();
        this.userService = userService;
    }

    async handle(request) {
        return this.userService.findUsers(request);
    }
}

module.exports = FindUsersUseCase;

