/**
 * Create User Use Case
 */
class CreateUserUseCase {
    constructor(userService) {
        this.userService = userService
    }

    async execute(request) {
        try {
            const user = await this.userService.createUser(request)
            return { success: true, data: user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateUserUseCase
